#!/bin/sh
# Rebuild index.js from index.jsx.
# Run after every edit to index.jsx so the deployed dashboard reflects changes.
set -e
cd "$(dirname "$0")"
./tools/esbuild index.jsx \
  --bundle=false \
  --loader:.jsx=jsx \
  --jsx=transform \
  --target=es2017 \
  --minify \
  --outfile=index.js
ls -lh index.js
