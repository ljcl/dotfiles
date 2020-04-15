#!/usr/bin/env zsh

cd "$(dirname "${BASH_SOURCE}")"

git pull origin master

function doIt() {
  rsync --exclude ".git/" \
    --exclude ".DS_Store" \
    --exclude "bootstrap.zsh" \
    --exclude "README.md" \
    -avh --no-perms . ~
  source ~/.zshrc
}

read "confirm?This may overwrite existing files in your home directory. Are you sure?"
if [[ $confirm =~ ^[Yy]$ ]]; then
  doIt
fi
unset doIt
