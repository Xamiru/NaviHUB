"""Builds a session spec into NEW content files.

    python3 build_spec.py <spec.py> <session.json>

The spec module exposes SOURCES (new sources) and ENTITIES ((kind, dict) pairs).
Before writing, this
- gives every place without coordinates its Natural Earth position (gazetteer.py),
  when the place has a `modernCountry`;
- strips anything taken from themoviedb.org pages (posterUrl, portrayal characterName);
- skips a source that is already committed with identical content or for the same url
  (another session defined it), and stops on any other clash.
Then lib.write_all writes the files and the lock entries. Keep the spec and the
session json in ~/.cache/navihub-history-work/, never in /tmp or the repo.
"""
import importlib.util, json, os, sys
import gazetteer, lib


def build(spec_path, session):
    folder = os.path.dirname(os.path.abspath(spec_path))
    sys.path.insert(0, folder)
    os.chdir(folder)
    mod_spec = importlib.util.spec_from_file_location('session_spec', spec_path)
    spec = importlib.util.module_from_spec(mod_spec)
    mod_spec.loader.exec_module(spec)
    ents = [('source', s) for s in getattr(spec, 'SOURCES', [])] + list(spec.ENTITIES)

    located = 0
    used = set()
    for kind, e in ents:
        if kind == 'place' and not e.get('coords'):
            name = next((n['text'] for n in e['names'] if n.get('lang') == 'en'), e['names'][0]['text'])
            c = gazetteer.coords(name, e.get('modernCountry'), lib.TODAY)
            # Towns and villages Natural Earth lacks: GeoNames, never for regions or waters.
            if not c and e.get('placeType') not in ('region', 'water', 'country'):
                c = next((g for g in (gazetteer.geonames_coords(n['text'], e.get('modernCountry')) for n in e['names']) if g), None)
            if c:
                e['coords'] = c
                used.add(c['cites'][0]['source'])
                located += 1
    for sid, make in ((gazetteer.SOURCE_ID, gazetteer.source), (gazetteer.GEONAMES_ID, gazetteer.geonames_source)):
        if sid in used and not os.path.exists(os.path.join(lib.CONTENT, f'sources/{sid}.ts')):
            ents.append(('source', make(lib.TODAY)))
    print(f'{located} places located')

    for kind, e in ents:
        if kind == 'media':
            e['title'].pop('posterUrl', None)
            for link in e['links']:
                for p in link.get('portrayals', []):
                    p.pop('characterName', None)

    created = set(json.load(open(session))) if os.path.exists(session) else set()
    keep, skipped = [], []
    for kind, e in ents:
        if kind == 'source':
            rel = f"sources/{e['id']}.ts"
            path = os.path.join(lib.CONTENT, rel)
            if os.path.exists(path) and rel not in created:
                committed = open(path).read()
                text = f"import {{ defineSource }} from '../../schema'\n\nexport default defineSource({lib.ts(e)})\n"
                if committed == text or (e.get('url') and lib.ts_str(e['url']) in committed):
                    skipped.append(e['id'])
                    continue
                raise SystemExit(f'source {e["id"]} already committed with different content')
        keep.append((kind, e))
    refs = lib.write_all(keep, session)
    print(f'{len(refs)} files written; {len(skipped)} committed sources reused: {skipped}')


if __name__ == '__main__':
    build(os.path.abspath(sys.argv[1]), os.path.abspath(sys.argv[2]))
