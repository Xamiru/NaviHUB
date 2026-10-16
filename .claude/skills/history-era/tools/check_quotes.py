"""Citation integrity: every committed quote must still be found, verbatim, in the
cached page it was cut from, and no cached page may change its paragraph count.

    python3 check_quotes.py            # report
    python3 check_quotes.py --snapshot # record today's paragraph counts as the reference

Run it after any change to fetch.py, lib.py or edit.py, and before each era's build.
A tool change once dropped paragraphs that held only an invisible character and
shifted every later paragraph number on those pages; this catches that class in
seconds. Pages are read from the cache only, never fetched.
"""
import hashlib, json, os, sys
import edit, fetch

SNAPSHOT = os.path.join(fetch.CACHE, 'paragraph-counts.json')


def cached(url):
    return os.path.exists(os.path.join(fetch.CACHE, hashlib.sha1(url.encode()).hexdigest()))


def quotes(x, out):
    if isinstance(x, dict):
        if isinstance(x.get('text'), str) and 'cite' in x and isinstance(x.get('provenance'), dict):
            out.append(x)
        for v in x.values():
            quotes(v, out)
    elif isinstance(x, list):
        for v in x:
            quotes(v, out)
    return out


def main():
    cat = edit.load()
    pages, missing, uncached, closed, total = {}, [], set(), {}, 0
    for path, e in cat.items():
        for q in quotes(e, []):
            url = q['provenance'].get('url')
            if not url:
                continue
            total += 1
            if not cached(url):
                uncached.add(url)
                continue
            if url in closed:
                closed[url] += 1
                continue
            if url not in pages:
                try:
                    pages[url] = fetch.paragraphs(url)
                except SystemExit:
                    # robots.txt has closed the site to Claude agents since the
                    # quote was cut: listed for a decision, never read around.
                    closed[url] = 1
                    continue
            probe = q['text'].split('[…]')[0].strip()
            if not any(probe in p for p in pages[url]) and url not in fetch.KEEP_FORMS:
                # Some script-rendered pages keep their text inside a <form>
                # and were cut with keep_forms; read them that way.
                fetch.KEEP_FORMS.add(url)
                pages[url] = fetch.paragraphs(url)
            if not any(probe in p for p in pages[url]):
                missing.append(f"{path} {q.get('id')}: not found in {url}")
    counts = {u: len(ps) for u, ps in pages.items()}
    if '--snapshot' in sys.argv:
        json.dump(counts, open(SNAPSHOT, 'w'), indent=0, sort_keys=True)
        print(f'snapshot of {len(counts)} pages written to {SNAPSHOT}')
    shifted = []
    if os.path.exists(SNAPSHOT):
        before = json.load(open(SNAPSHOT))
        shifted = [f'{u}: {before[u]} -> {n} paragraphs' for u, n in counts.items() if u in before and before[u] != n]
    print(f'{total} quotes on {len(pages)} cached pages; {len(uncached)} pages not cached (skipped)')
    for line in missing:
        print('MISSING', line)
    for line in shifted:
        print('SHIFTED', line)
    for u, n in closed.items():
        print(f'CLOSED {u}: {n} quotes; robots.txt now closes this site to Claude agents')
    print(f'{len(missing)} missing, {len(shifted)} pages renumbered')
    sys.exit(1 if missing or shifted else 0)


if __name__ == '__main__':
    main()
