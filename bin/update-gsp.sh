#!/bin/bash
set -euo pipefail

git pull
npm run build-gsp
npx prettier --write ./src/gsp/EliteGspData.ts
git add .

MESSAGE="build: update GSP $(date)"
AUTHOR="Smash Training Bot <smashtraining@waleedkhan.name>"
if git log -1 --pretty=%B | grep 'build: update GSP'; then
  git commit --amend --message "$MESSAGE" --author "$AUTHOR"
  git push -f
else
  git commit --message "$MESSAGE" --author "$AUTHOR"
  git push
fi
