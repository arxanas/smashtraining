#!/bin/bash
set -euo pipefail

export GIT_AUTHOR_NAME="Smash Training Bot"
export GIT_AUTHOR_EMAIL="smashtraining@waleedkhan.name"
export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"

git pull
npm run build-gsp
npx prettier --write ./src/gsp/EliteGspData.ts
git add .

MESSAGE="build: update GSP $(date)"
if git log -1 --pretty=%B | grep 'build: update GSP'; then
  git commit --amend --message "$MESSAGE"
  git push -f
else
  git commit --message "$MESSAGE"
  git push
fi
