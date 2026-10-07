"""Edit committed History content files in place.

The .ts files are the truth once built. This loads them all as dicts (through
dump_catalog.ts), lets a script change them, and writes a changed entity back in
the exact format lib.write_all produces, so an unchanged entity round-trips
byte for byte (`python3 edit.py --roundtrip` proves it for the whole catalog).

    import edit
    cat = edit.load()                      # {'events/x.ts': {...}, ...}
    e = cat['events/x.ts']
    ...change e...
    edit.save('events/x.ts', e)

Quotes added here are still cut with lib.Q from cached pages; never type text.
"""
import json, os, subprocess, sys, tempfile
import lib

TOOLS = os.path.dirname(os.path.abspath(__file__))
FOLDER_KIND = {folder: kind for kind, (_, folder) in lib.DEFINE.items()}


def load():
    out = os.path.join(tempfile.gettempdir(), 'navihub-history-catalog.json')
    subprocess.run([os.path.join(lib.REPO, 'node_modules/.bin/vite-node'), '-c', 'vitest.config.ts',
                    os.path.join(TOOLS, 'dump_catalog.ts'), out], cwd=lib.REPO, check=True, capture_output=True)
    return json.load(open(out))


def render(path, entity):
    kind = FOLDER_KIND[path.split('/')[0]]
    fn = lib.DEFINE[kind][0]
    body = {k: v for k, v in entity.items() if k not in ('v', 'kind')}
    if kind == 'media':
        body.pop('id', None)
    return f"import {{ {fn} }} from '../../schema'\n\nexport default {fn}({lib.ts(body)})\n"


def save(path, entity):
    full = os.path.join(lib.CONTENT, path)
    if not os.path.exists(full):
        raise SystemExit(f'{path} is not a committed file; new entities go through lib.write_all')
    open(full, 'w').write(render(path, entity))


def next_quote_id(entity):
    """The next free q-number anywhere in the entity."""
    ids = []

    def walk(x):
        if isinstance(x, dict):
            if 'text' in x and 'cite' in x and isinstance(x.get('id'), str):
                ids.append(x['id'])
            for v in x.values():
                walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
    walk(entity)
    nums = [int(i[1:]) for i in ids if i[:1] == 'q' and i[1:].isdigit()]
    return f'q{max(nums, default=0) + 1}'


if __name__ == '__main__' and sys.argv[1:] == ['--roundtrip']:
    cat = load()
    bad = [p for p, e in cat.items() if open(os.path.join(lib.CONTENT, p)).read() != render(p, e)]
    print(f'{len(cat)} files, {len(bad)} differ')
    for p in bad[:20]:
        print('  ', p)


# ---------- quotes on committed pages ----------

import fetch


def _quotes(x, out):
    if isinstance(x, dict):
        if 'text' in x and 'cite' in x:
            out.append(x)
        for v in x.values():
            _quotes(v, out)
    elif isinstance(x, list):
        for v in x:
            _quotes(v, out)
    return out


def para_index(url, text):
    """The paragraph of the cached page `url` that contains `text` (a quote with
    `[…]` matches on its first part)."""
    probe = text.split('[…]')[0].strip()
    hits = [i for i, p in enumerate(fetch.paragraphs(url)) if probe in p]
    if len(hits) != 1:
        raise SystemExit(f'{len(hits)} paragraphs of {url} contain {probe[:60]!r}')
    return hits[0]


def recut(quote, start, end=None):
    """Re-cuts an existing quote from the same paragraph with new start/end
    phrases (to take in the sentence that names its subject). The citation is
    unchanged, since the paragraph is the same."""
    url = quote['provenance']['url']
    i = para_index(url, quote['text'])
    if url not in lib.PAGES:
        lib.page(url, quote['cite']['loc'].get('section'), None)
    quote['text'] = lib.cut(url, i, start, end)
    quote['provenance']['at'] = lib.TODAY
    return quote


def register(cat, url):
    """Registers an already-cited page with the paragraph numbering its committed
    quotes use, so a new lib.Q on it cites consistently. Returns the source id."""
    seen = [q for e in cat.values() for q in _quotes(e, []) if q.get('provenance', {}).get('url') == url]
    if not seen:
        raise SystemExit(f'no committed quote cites {url}; register it with lib.page')
    q = seen[0]
    loc = q['cite']['loc']
    base = None
    if 'para' in loc and loc['para'].isdigit():
        base = para_index(url, q['text']) - int(loc['para']) + 1
    lib.page(url, loc.get('section'), base)
    return q['cite']['source']


def add_quote(entity, quote, section='overview', first=False):
    """Adds a quote (from lib.Q) to a section with the entity's next free id."""
    quote['id'] = next_quote_id(entity)
    for s in entity.setdefault('sections', []):
        if s['kind'] == section:
            s['quotes'].insert(0, quote) if first else s['quotes'].append(quote)
            return quote
    sec = {'kind': section, 'quotes': [quote]}
    entity['sections'].insert(0, sec) if section == 'overview' else entity['sections'].append(sec)
    return quote
