#!/usr/bin/env python3
"""Fetch a page and print its text paragraphs, numbered, exactly as published.

usage: fetch.py URL [regex-filter] [--max N]
Pages are cached outside the repository (NAVIHUB_HISTORY_CACHE, default
~/.cache/navihub-history) so every later read quotes the identical text.
"""
import hashlib, html, os, re, sys, urllib.error, urllib.parse, urllib.request, urllib.robotparser
from html.parser import HTMLParser

CACHE = os.environ.get('NAVIHUB_HISTORY_CACHE') or os.path.expanduser('~/.cache/navihub-history')
os.makedirs(CACHE, exist_ok=True)
UA = 'NaviHUB/1.0 (personal offline history archive; research session)'

BLOCK = {'p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'blockquote', 'dd', 'dt', 'td', 'th', 'pre', 'figcaption', 'caption', 'div', 'br', 'tr', 'section', 'article'}
SKIP = {'script', 'style', 'noscript', 'svg', 'nav', 'footer', 'header', 'form', 'button', 'select'}

# Pages whose whole body sits inside a <form> (old ASP.NET sites): parsed without
# skipping forms. Opt-in per URL (lib.page(..., keep_forms=True)) so every other
# page keeps the paragraph numbering its committed quotes were cut against.
KEEP_FORMS = set()

class P(HTMLParser):
    def __init__(self, skip_tags=None):
        super().__init__(convert_charrefs=True)
        self.skip_tags = SKIP if skip_tags is None else skip_tags
        self.parts, self.tags, self.cur, self.skip, self.tag = [], [], [], 0, ''
    def flush(self):
        t = re.sub(r'\s+', ' ', ''.join(self.cur)).strip()
        if t:
            self.parts.append(t); self.tags.append(self.tag)
        self.cur = []
    def handle_starttag(self, tag, attrs):
        if tag in self.skip_tags: self.skip += 1
        elif tag in BLOCK:
            self.flush(); self.tag = tag
    def handle_endtag(self, tag):
        if tag in self.skip_tags: self.skip = max(0, self.skip - 1)
        elif tag in BLOCK: self.flush()
    def handle_data(self, data):
        if not self.skip: self.cur.append(data)

# Claude agent names publishers address in robots.txt; a page closed to any of
# them is never fetched (TMDB, for one, closes its whole site). Only groups
# that name one of these agents count: a generic `User-agent: *` crawler rule
# (Wikimedia's /w/ for its API, which it invites identified clients to use) is
# not an opt-out aimed at AI agents.
AI_AGENTS = ('ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'Claude-Web', 'anthropic-ai')
_robots = {}

def ai_groups(lines):
    """Only the robots.txt groups whose user-agent lines name an AI agent."""
    names = {a.lower() for a in AI_AGENTS}
    out, group, agents, in_agents = [], [], [], False
    def flush():
        if any(a in names for a in agents):
            out.extend(group)
    for raw in lines:
        line = raw.split('#', 1)[0].strip()
        if not line:
            continue
        key = line.split(':', 1)[0].strip().lower()
        if key == 'user-agent':
            if not in_agents:
                flush()
                group, agents = [], []
            in_agents = True
            agents.append(line.split(':', 1)[1].strip().lower())
        else:
            in_agents = False
        group.append(line)
    flush()
    return out

def allowed(url):
    parts = urllib.parse.urlsplit(url)
    origin = f'{parts.scheme}://{parts.netloc}'
    if origin not in _robots:
        rp = urllib.robotparser.RobotFileParser()
        try:
            req = urllib.request.Request(origin + '/robots.txt', headers={'User-Agent': UA})
            rp.parse(ai_groups(urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace').splitlines()))
        except urllib.error.HTTPError:
            rp.parse([])
        except Exception:
            rp.parse([])
        _robots[origin] = rp
    return all(_robots[origin].can_fetch(a, url) for a in AI_AGENTS)

def get(url):
    key = hashlib.sha1(url.encode()).hexdigest()
    path = os.path.join(CACHE, key)
    if not allowed(url):
        raise SystemExit(f'robots.txt closes {url} to Claude agents; use another source')
    if os.path.exists(path):
        return open(path, 'rb').read()
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'en'})
    data = urllib.request.urlopen(req, timeout=60).read()
    open(path, 'wb').write(data)
    open(path + '.url', 'w').write(url)
    return data

def decode(raw):
    # UTF-8 first (every page that decoded before still decodes the same), then the
    # page's own declared charset (Arabic and Persian pages are often windows-1256),
    # then cp1252 for old Western pages.
    try:
        return raw.decode('utf-8')
    except UnicodeDecodeError:
        pass
    import re as _re
    m = _re.search(rb'charset=["\']?([A-Za-z0-9_-]+)', raw[:4096])
    if m:
        try:
            return raw.decode(m.group(1).decode('ascii'))
        except (LookupError, UnicodeDecodeError):
            pass
    return raw.decode('cp1252', errors='replace')

def paragraphs(url):
    raw = get(url)
    text = decode(raw)
    if url.endswith('.txt'):
        return [re.sub(r'\s+', ' ', b).strip() for b in re.split(r'\n\s*\n', text) if b.strip()]
    p = P(SKIP - {'form'} if url in KEEP_FORMS else None); p.feed(text); p.flush()
    return p.parts

def tagged(url):
    raw = decode(get(url))
    p = P(); p.feed(raw); p.flush()
    return list(zip(p.tags, p.parts))

if __name__ == '__main__':
    argv = sys.argv[1:]
    mx = 400
    if '--max' in argv:
        i = argv.index('--max'); mx = int(argv[i + 1]); del argv[i:i + 2]
    args = argv
    url = args[0]
    flt = re.compile(args[1], re.I) if len(args) > 1 else None
    for i, t in enumerate(paragraphs(url)):
        if flt and not flt.search(t): continue
        print(f'[{i}] {t[:mx] if mx else t}')
