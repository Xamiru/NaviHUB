import importlib.util
import unittest
import tempfile
import sys
import json
from dataclasses import dataclass
from unittest.mock import patch
from pathlib import Path
from types import SimpleNamespace

spec = importlib.util.spec_from_file_location('metadata', Path(__file__).parents[2] / 'src/main/spotifyMetadata.py')
metadata = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metadata)


class MetadataPages(unittest.TestCase):
    def test_pages_preserve_order_and_report_progress(self):
        client = SimpleNamespace(
            playlist=lambda _: {'name': 'Mix'},
            playlist_items=lambda _: {'items': [{'track': {'id': 'one'}}], 'total': 2, 'next': 'page2'},
            next=lambda _: {'items': [{'item': {'id': 'two'}}], 'total': 2, 'next': None})
        progress = []
        title, rows = metadata.collect(client, 'url', lambda n, total: progress.append((n, total)))
        self.assertEqual(title, 'Mix')
        self.assertEqual(len(rows), 2)
        self.assertEqual(progress, [(1, 2), (2, 2)])

    def test_missing_tail_never_becomes_complete(self):
        client = SimpleNamespace(playlist=lambda _: {'name': 'Mix'},
            playlist_items=lambda _: {'items': [{}], 'total': 2, 'next': None})
        with self.assertRaisesRegex(ValueError, 'count'):
            metadata.collect(client, 'url', lambda *_: None)

    def test_failed_page_never_becomes_complete(self):
        client = SimpleNamespace(playlist=lambda _: {'name': 'Mix'},
            playlist_items=lambda _: {'items': [{}], 'total': 2, 'next': 'page2'}, next=lambda _: None)
        with self.assertRaisesRegex(ValueError, 'page'):
            metadata.collect(client, 'url', lambda *_: None)


class MetadataCheckpoint(unittest.TestCase):
    def test_interrupted_refresh_reuses_completed_tracks(self):
        @dataclass
        class SongData:
            song_id: str
        calls = []
        fail = [True]
        def song(url):
            identity = url.rsplit('/', 1)[1]
            calls.append(identity)
            if identity == 'two' and fail[0]:
                raise RuntimeError('Interrupted')
            return SongData(identity)
        client = SimpleNamespace(playlist=lambda _: {'name': 'Mix'},
            playlist_items=lambda _: {'items': [{'track': {'id': x, 'type': 'track'}} for x in ['one', 'two']], 'total': 2, 'next': None})
        class SpotifyClient:
            @staticmethod
            def init(**kwargs): pass
            def __new__(cls): return client
        modules = {'spotdl.utils.spotify': SimpleNamespace(SpotifyClient=SpotifyClient),
            'spotdl.utils.config': SimpleNamespace(SPOTIFY_OPTIONS={}),
            'spotdl.types.song': SimpleNamespace(Song=SimpleNamespace(from_url=song))}
        # One worker ensures the first successful row is flushed before the injected failure.
        executor = metadata.concurrent.futures.ThreadPoolExecutor
        with tempfile.TemporaryDirectory() as temp, patch.dict(sys.modules, modules), \
             patch.object(metadata.importlib.metadata, 'version', return_value='4.5.2'), \
             patch.object(metadata.concurrent.futures, 'ThreadPoolExecutor', side_effect=lambda **_: executor(max_workers=1)):
            output, checkpoint = Path(temp) / 'out.json', Path(temp) / 'checkpoint.jsonl'
            with patch.object(sys, 'argv', ['metadata.py', 'url', str(output), str(checkpoint), 'refresh']):
                with self.assertRaises(RuntimeError): metadata.main()
                self.assertFalse(output.exists())
                self.assertIn('one', checkpoint.read_text())
                fail[0] = False
                self.assertEqual(metadata.main(), 0)
                rows = json.loads(output.read_text())
                self.assertEqual([row['song_id'] for row in rows], ['one', 'two'])
                self.assertEqual(calls.count('one'), 1)
                self.assertEqual([row['list_position'] for row in rows], [1, 2])

    def test_unsupported_version_declines_before_importing_internal_api(self):
        with patch.object(metadata.importlib.metadata, 'version', return_value='4.6.0'):
            self.assertEqual(metadata.main(), 78)


if __name__ == '__main__':
    unittest.main()
