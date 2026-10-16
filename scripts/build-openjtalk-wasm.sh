#!/usr/bin/env bash
# Builds Open JTalk 1.11 + hts_engine_API 1.10 to WebAssembly for the Japanese
# section's offline word audio (src/main/tts/). Output: resources/openjtalk/
# open_jtalk.js + open_jtalk.wasm, committed to the repo, so a normal build or
# release never needs this toolchain. Re-run only to change the engine build.
#
# Requirements: an Emscripten SDK (EMSDK, default ~/.cache/emsdk, version
# pinned below) and network access to the Ubuntu archive. Sources are the
# archive's copies of the upstream release tarballs, checked against the
# SHA-256 sums in their signed .dsc files (open-jtalk_1.11-5, htsengine_1.10-7).
# Licences: Open JTalk and hts_engine_API are Modified BSD; see
# resources/openjtalk/README.md.
set -euo pipefail

EMSDK_VERSION=3.1.74
EMSDK="${EMSDK:-$HOME/.cache/emsdk}"
if [ -z "${WORK:-}" ]; then
  WORK="$(mktemp -d)"
  trap 'rm -rf "$WORK"' EXIT
fi
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/resources/openjtalk"

HTS_URL=http://archive.ubuntu.com/ubuntu/pool/universe/h/htsengine/htsengine_1.10.orig.tar.gz
HTS_SHA=e2132be5860d8fb4a460be766454cfd7c3e21cf67b509c48e1804feab14968f7
OJT_URL=http://archive.ubuntu.com/ubuntu/pool/universe/o/open-jtalk/open-jtalk_1.11.orig.tar.gz
OJT_SHA=20fdc6aeb6c757866034abc175820573db43e4284707c866fcd02c8ec18de71f

# emsdk_env.sh reads unset variables; relax -u just for it, and keep its errors.
set +u
# shellcheck disable=SC1091
source "$EMSDK/emsdk_env.sh" >/dev/null
set -u
EMCC_VERSION="$(emcc --version)"
[[ "$EMCC_VERSION" == *"$EMSDK_VERSION"* ]] || {
  echo "need emsdk $EMSDK_VERSION at $EMSDK (./emsdk install $EMSDK_VERSION && ./emsdk activate $EMSDK_VERSION)" >&2
  exit 1
}

mkdir -p "$WORK/src" "$WORK/prefix"
cd "$WORK/src"
fetch() {
  local url=$1 sha=$2 file
  file=$(basename "$url")
  [ -f "$file" ] || curl -fsSL -o "$file" "$url"
  echo "$sha  $file" | sha256sum -c -
  tar xzf "$file"
}
fetch "$HTS_URL" "$HTS_SHA"
fetch "$OJT_URL" "$OJT_SHA"

# hts_engine_API: HTS_ftell reads glibc's private fpos_t.__pos, which
# Emscripten's libc does not have; ftell is the portable equivalent.
cd "$WORK/src/hts_engine_API-1.10"
python3 - <<'PY'
import re
p = 'lib/HTS_misc.c'
s = open(p).read()
s = re.sub(r'fpos_t pos;\s*fgetpos\(\(FILE \*\) fp->pointer, &pos\);\s*#if.*?#endif[^\n]*\n',
           'return (size_t) ftell((FILE *) fp->pointer);\n', s, count=1, flags=re.S)
open(p, 'w').write(s)
PY
emconfigure ./configure --prefix="$WORK/prefix" >/dev/null
emmake make -j2 >/dev/null
emmake make install >/dev/null

# Open JTalk, then relink its command-line program as a Node-targeted module
# the main process drives through callMain() in a worker thread.
cd "$WORK/src/open_jtalk-1.11"
# Its 2018 C++ (the bundled MeCab) uses `register`, removed in C++17.
CXXFLAGS="-O2 -std=c++11" emconfigure ./configure \
  --with-hts-engine-header-path="$WORK/prefix/include" \
  --with-hts-engine-library-path="$WORK/prefix/lib" \
  --with-charset=UTF-8 >/dev/null
# Everything but mecab-naist-jdic: building the dictionary runs the just-
# compiled (WebAssembly) mecab-dict-index, and the dictionary is downloaded
# separately at setup anyway (src/main/tts/openJTalkPack.ts).
python3 - <<'PY'
s = open('Makefile').read()
s = s.replace('bin \\\n          mecab-naist-jdic', 'bin')
assert 'mecab-naist-jdic' not in s.split('SUBDIRS =')[1].split('\n\n')[0]
open('Makefile', 'w').write(s)
PY
emmake make -j2 >/dev/null
test -f bin/open_jtalk.o

LIBS=$(find . -name '*.a' | grep -v '\.libs' | sort)
mkdir -p "$OUT"
emcc -O2 bin/open_jtalk.o $LIBS "$WORK/prefix/lib/libHTSEngine.a" \
  -o "$OUT/open_jtalk.js" \
  -s ENVIRONMENT=node -s MODULARIZE=1 -s EXPORT_NAME=createOpenJTalk \
  -s INVOKE_RUN=0 -s EXIT_RUNTIME=0 -s ALLOW_MEMORY_GROWTH=1 -s FORCE_FILESYSTEM=1 \
  -s EXPORTED_RUNTIME_METHODS=callMain,FS,NODEFS -lnodefs.js
ls -la "$OUT"
