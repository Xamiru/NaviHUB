# Open JTalk (WebAssembly)

`open_jtalk.js` + `open_jtalk.wasm` are Open JTalk 1.11 and hts_engine_API 1.10
compiled to WebAssembly by `scripts/build-openjtalk-wasm.sh` (Emscripten 3.1.74,
Node target, `callMain` interface). They power the Japanese section's offline
voice: `src/main/tts/ttsWorker.ts` runs them in a worker thread.

- Sources: the Ubuntu archive's copies of the upstream release tarballs,
  `open-jtalk_1.11.orig.tar.gz` (SHA-256 `20fdc6ae…de71f`) and
  `htsengine_1.10.orig.tar.gz` (SHA-256 `e2132be5…968f7`), checked against the
  `.dsc` files of `open-jtalk 1.11-5` and `htsengine 1.10-7build1`.
- One source patch: `HTS_ftell` in hts_engine_API read glibc's private
  `fpos_t.__pos`; it now calls `ftell`. The bundled MeCab is compiled as C++11.
- Licences: Open JTalk and hts_engine_API are Modified BSD (Nagoya Institute of
  Technology, Department of Computer Science); the bundled MeCab is BSD/LGPL/GPL
  triple-licensed and used under BSD.

Not in this folder, downloaded at setup into `<userData>/openjtalk/` (pinned
SHA-256 in `src/main/tts/ttsCore.ts`):

- `open_jtalk_dic_utf_8-1.11.tar.gz` — NAIST Japanese Dictionary compiled for
  Open JTalk (Modified BSD).
- `hts_voice_nitech_jp_atr503_m001-1.05.tar.gz` — the NIT ATR503 M001 voice,
  Nagoya Institute of Technology (Creative Commons Attribution 3.0), credited in
  Settings → Learning.
