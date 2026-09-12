"""Version-guarded metadata adapter. No audio work; checkpoints survive cancellation."""
import concurrent.futures
import hashlib
import importlib.metadata
import json
import os
import sys
from dataclasses import asdict
from pathlib import Path


def collect(client, url, progress):
    info = client.playlist(url)
    if not isinstance(info, dict):
        raise ValueError('Playlist metadata unavailable')
    page = client.playlist_items(url)
    rows = []
    expected = page.get('total') if isinstance(page, dict) else None
    visited = set()
    while isinstance(page, dict):
        rows.extend(page.get('items', []))
        progress(len(rows), expected)
        link = page.get('next')
        if not link:
            break
        if link in visited:
            raise ValueError('Repeated playlist page')
        visited.add(link)
        page = client.next(page)
        if not isinstance(page, dict):
            raise ValueError('Incomplete playlist page')
    if expected is None or len(rows) != expected:
        raise ValueError('Incomplete playlist count')
    return info.get('name', 'Spotify playlist'), rows


def main():
    if importlib.metadata.version('spotdl') != '4.5.2':
        return 78
    from spotdl.utils.spotify import SpotifyClient
    from spotdl.utils.config import SPOTIFY_OPTIONS
    from spotdl.types.song import Song
    url, output, checkpoint, refresh = sys.argv[1:]
    SpotifyClient.init(**SPOTIFY_OPTIONS)
    client = SpotifyClient()
    title, rows = collect(client, url, lambda n, total: print(
        f'NAVIHUB pages {n}/{total}', flush=True))
    print(f'Found {len(rows)} songs in {title} (Playlist)', flush=True)
    identities = [(row.get('track') or row.get('item') or {}).get('id') for row in rows]
    fingerprint = hashlib.sha256(json.dumps(identities).encode()).hexdigest()
    cache = {}
    path = Path(checkpoint)
    if path.exists():
        for line in path.read_text(encoding='utf-8').splitlines():
            try:
                entry = json.loads(line)
                if entry['fingerprint'] == fingerprint:
                    cache[entry['id']] = entry['song']
            except (ValueError, KeyError):
                continue
    path.parent.mkdir(parents=True, exist_ok=True)
    result = [None] * len(rows)
    with path.open('a', encoding='utf-8') as saved:
        os.chmod(path, 0o600)
        def resolve(index):
            raw = rows[index].get('track') or rows[index].get('item') or {}
            identity = identities[index]
            if not identity or raw.get('is_local') or raw.get('type') != 'track':
                return index, {'is_unavailable': True}, None
            song = cache.get(identity)
            if song is None:
                song = asdict(Song.from_url(f'https://open.spotify.com/track/{identity}'))
            return index, dict(song), identity
        with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
            futures = [pool.submit(resolve, index) for index in range(len(rows))]
            for done, future in enumerate(concurrent.futures.as_completed(futures), 1):
                index, song, identity = future.result()
                if identity and identity not in cache:
                    saved.write(json.dumps({'fingerprint': fingerprint, 'id': identity, 'song': song}) + '\n')
                    saved.flush()
                song.update(list_name=title, list_position=index + 1, list_length=len(rows))
                result[index] = song
                print(f'NAVIHUB metadata {done}/{len(rows)}', flush=True)
    Path(output).write_text(json.dumps(result), encoding='utf-8')
    os.chmod(output, 0o600)
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except Exception as error:
        print(f'Metadata checkpoint kept: {type(error).__name__}', file=sys.stderr, flush=True)
        sys.exit(1)
