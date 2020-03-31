#!/bin/bash
set -euo pipefail

git pull
npm run build-gsp
npx prettier --write ./src/gsp/EliteGspData.ts
git add .
git commit \
  --message "build: update GSP $(date)" \
  --author "Smash Training Bot <smashtraining@waleedkhan.name>"
git push
