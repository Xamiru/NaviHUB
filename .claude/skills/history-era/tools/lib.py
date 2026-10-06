"""Helpers for writing NEW History content files from cached sources.

Every quote is cut from the cached page text by a start phrase and an
optional end phrase; the build stops if either is missing or ambiguous, so no
quote text is ever typed by hand. A start phrase alone is the whole quote.

A session spec (in the scratchpad, never in the repo) imports this module,
builds entity dicts with Q/cite/claim/..., and calls write_all(). The .ts files
are the truth afterwards: write_all refuses to overwrite a content file this
session did not create, so later corrections are made in the .ts file itself.
"""
import datetime, json, os, re
import fetch

TODAY = datetime.date.today().isoformat()
REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '..'))
CONTENT = os.path.join(REPO, 'src/shared/history/content')

# ---------- page locators ----------

PAGES = {}  # url -> dict(section=..., base=int | None)

def page(url, section, base=None, keep_forms=False):
    """Registers a page. `base` is the paragraph index of the body's first
    paragraph, so locators count paragraphs as a reader would. `keep_forms`
    reads a page whose body sits inside a <form> (fetch.KEEP_FORMS)."""
    PAGES[url] = {'section': section, 'base': base}
    if keep_forms:
        fetch.KEEP_FORMS.add(url)
    return url

def para_text(url, i):
    ps = fetch.paragraphs(url)
    if i >= len(ps):
        raise SystemExit(f'no paragraph {i} in {url}')
    return ps[i]

def loc_for(url, i, section=None, para=None):
    meta = PAGES.get(url)
    if not meta:
        raise SystemExit(f'unregistered page {url}')
    out = {'section': section or meta['section']}
    if para is not None:
        out['para'] = str(para)
    elif meta['base'] is not None:
        out['para'] = str(i - meta['base'] + 1)
    return out

def cite(src, url, i, section=None, para=None):
    para_text(url, i)
    # `_at` is for checks.py only; keys starting with "_" are never written.
    return {'source': src, 'loc': loc_for(url, i, section, para), '_at': [url, i]}

def cut(url, i, start, end=None):
    text = para_text(url, i)
    a = text.find(start)
    if a < 0:
        raise SystemExit(f'start phrase not found in {url} [{i}]: {start!r}')
    if text.find(start, a + 1) >= 0:
        raise SystemExit(f'start phrase ambiguous in {url} [{i}]: {start!r}')
    if end is None:
        return start
    b = text.find(end, a)
    if b < 0:
        raise SystemExit(f'end phrase not found in {url} [{i}]: {end!r}')
    return text[a:b + len(end)]

_ids = {}

def Q(owner, src, url, i, start, end=None, lang='en', section=None, para=None):
    """A verbatim quote; ids are q1, q2... per owning entity."""
    n = _ids.get(owner, 0) + 1
    _ids[owner] = n
    return {
        'id': f'q{n}',
        'text': cut(url, i, start, end),
        'lang': lang,
        'cite': cite(src, url, i, section, para),
        'provenance': {'via': 'web', 'at': TODAY, 'url': url},
    }

def claim(*alts):
    return {'alts': list(alts)}

def alt(value, *cites, heldBy=None):
    a = {'value': value, 'cites': list(cites)}
    if heldBy:
        a['heldBy'] = heldBy
    return a

def date(d, **kw):
    out = {'d': d}
    out.update(kw)
    return out

def dclaim(d, *cites, **kw):
    return claim(alt(date(d, **kw), *cites))

def name(text, lang='en', role='primary', **kw):
    out = {'text': text, 'lang': lang, 'role': role}
    out.update(kw)
    return out

def holder(kind, nm, **kw):
    out = {'kind': kind, 'name': nm}
    out.update(kw)
    return out

# ---------- TS serialisation ----------

IDENT = re.compile(r'^[A-Za-z_$][A-Za-z0-9_$]*$')

def ts_str(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n') + "'"

def ts(v, ind=0):
    pad = '  ' * ind
    if v is None:
        return 'undefined'
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, (int, float)):
        return repr(v)
    if isinstance(v, str):
        return ts_str(v)
    if isinstance(v, list):
        if not v:
            return '[]'
        if all(isinstance(x, (str, int, float)) for x in v):
            inline = '[' + ', '.join(ts(x) for x in v) + ']'
            if len(inline) + len(pad) < 96:
                return inline
        return '[\n' + ',\n'.join(pad + '  ' + ts(x, ind + 1) for x in v) + '\n' + pad + ']'
    if isinstance(v, dict):
        items = [(k, x) for k, x in v.items() if x is not None and not k.startswith('_')]
        if not items:
            return '{}'
        parts = []
        for k, x in items:
            key = k if IDENT.match(k) else ts_str(k)
            parts.append(f'{pad}  {key}: {ts(x, ind + 1)}')
        inline = '{ ' + ', '.join(p.strip() for p in parts) + ' }'
        if len(inline) + len(pad) < 96 and '\n' not in inline:
            return inline
        return '{\n' + ',\n'.join(parts) + '\n' + pad + '}'
    raise TypeError(type(v))

DEFINE = {
    'event': ('defineEvent', 'events'),
    'person': ('definePerson', 'people'),
    'period': ('definePeriod', 'periods'),
    'place': ('definePlace', 'places'),
    'source': ('defineSource', 'sources'),
    'interpretation': ('defineInterpretation', 'interpretations'),
    'media': ('defineMedia', 'media'),
}

def media_id(t):
    return re.sub(r'^-+|-+$', '', re.sub(r'[^a-z0-9]+', '-', f"{t['source']}-{t['mediaType']}-{t['externalId']}".lower()))

def write_all(entities, session_file):
    """Writes `(kind, entity)` pairs as content files and adds their refs to
    ids.lock.json. `session_file` (a JSON path in the scratchpad) records the
    files this session created; any other existing file is refused."""
    created = set(json.load(open(session_file))) if os.path.exists(session_file) else set()
    plan = []
    for kind, ent in entities:
        fn, folder = DEFINE[kind]
        body = dict(ent)
        eid = media_id(body['title']) if kind == 'media' else body['id']
        if kind == 'media':
            body.pop('id', None)
        rel = f'{folder}/{eid}.ts'
        if os.path.exists(os.path.join(CONTENT, rel)) and rel not in created:
            raise SystemExit(f'{rel} already exists and was not created by this session; edit it directly')
        plan.append((f'{kind}:{eid}', rel, fn, body))
    for ref, rel, fn, body in plan:
        text = f"import {{ {fn} }} from '../../schema'\n\nexport default {fn}({ts(body)})\n"
        open(os.path.join(CONTENT, rel), 'w').write(text)
        created.add(rel)
    json.dump(sorted(created), open(session_file, 'w'), indent=1)
    lock_path = os.path.join(CONTENT, 'ids.lock.json')
    lock = json.load(open(lock_path))
    lock['ids'] = sorted(set(lock['ids']) | {r for r, *_ in plan})
    open(lock_path, 'w').write(json.dumps(lock, indent=2, ensure_ascii=False) + '\n')
    return [r for r, *_ in plan]
