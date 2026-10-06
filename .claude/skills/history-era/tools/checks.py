"""Session checks over spec modules that expose ENTITIES = [(kind, entity), ...].

usage: checks.py dates   spec_a [spec_b ...]   every dated claim beside the words that support it
       checks.py repeats spec_a [spec_b ...]   quotes repeated or nested on one article page
       checks.py json    spec out.json         dump for validate_spec.ts (entities, plus SOURCES)
"""
import importlib, json, re, sys
from collections import defaultdict
import fetch

def entities(mods):
    out = []
    for m in mods:
        mod = importlib.import_module(m)
        out += [('source', s) for s in getattr(mod, 'SOURCES', [])] + mod.ENTITIES
    return out

def strip(v):
    if isinstance(v, dict):
        return {k: strip(x) for k, x in v.items() if x is not None and not k.startswith('_')}
    if isinstance(v, list):
        return [strip(x) for x in v]
    return v

def dump(args):
    import lib
    mod, out = args
    rows = []
    for kind, e in entities([mod]):
        fn, folder = lib.DEFINE[kind]
        body = strip(e)
        if kind == 'media':
            body['id'] = lib.media_id(body['title'])
        body = {'v': 1, 'kind': kind, **body}
        rows.append({'path': f"{folder}/{body['id']}.ts", 'entity': body})
    json.dump(rows, open(out, 'w'), ensure_ascii=False)
    print(f'{len(rows)} entities dumped to {out}')

def walk_claims(node, path, out):
    if isinstance(node, dict):
        if 'alts' in node:
            for a in node['alts']:
                out.append((path, a['value'], a['cites']))
        for k, v in node.items():
            if k != 'alts':
                walk_claims(v, f'{path}.{k}', out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            walk_claims(v, f'{path}[{i}]', out)

def dates(mods):
    for kind, e in entities(mods):
        found = []
        walk_claims(e, '', found)
        for path, value, cites in found:
            v = value.get('d') if isinstance(value, dict) and 'd' in value else value
            for c in cites:
                url, i = c['_at']
                text = fetch.paragraphs(url)[i]
                year = str(v)[:4] if isinstance(v, str) else None
                hits = [text[max(0, m.start() - 90):m.end() + 40] for m in re.finditer(year, text)] if year else []
                print(f"{kind}:{e.get('id')}{path} = {v}  [{c['source']}]")
                print('    ' + (' | '.join(hits[:2]) if hits else text[:200]))

def quotes(node, out):
    if isinstance(node, dict):
        if 'text' in node and 'cite' in node and 'provenance' in node:
            out.append(node['text'])
        for v in node.values():
            quotes(v, out)
    elif isinstance(node, list):
        for v in node:
            quotes(v, out)

def repeats(mods):
    ents = entities(mods)
    about = defaultdict(list)
    for kind, e in ents:
        if kind == 'interpretation':
            for a in e['about']:
                about[a].append(e)
    for kind, e in ents:
        if kind not in ('event', 'person', 'period', 'place'):
            continue
        ref = f"{kind}:{e['id']}"
        qs = []
        quotes(e, qs)
        for i in about[ref]:
            quotes(i, qs)
        counts = defaultdict(int)
        for t in qs:
            counts[t] += 1
        for t, n in counts.items():
            if n > 1:
                print(f'{ref}: repeated x{n}: {t[:90]}')
        for a in counts:
            for b in counts:
                if a != b and a in b:
                    print(f'{ref}: nested: {a[:60]!r} inside {b[:40]!r}')

if __name__ == '__main__':
    {'dates': dates, 'repeats': repeats, 'json': dump}[sys.argv[1]](sys.argv[2:])
