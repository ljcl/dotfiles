#!/usr/bin/env zsh

# Make sure we’re using the latest Homebrew.
# Then Upgrade any already-installed formulae.
brew update
brew upgrade

# Install GNU core utilities (those that come with macOS are outdated).
# Don’t forget to add `$(brew --prefix coreutils)/libexec/gnubin` to `$PATH`.
brew install coreutils
brew install moreutils

# Install GNU `find`, `locate`, `updatedb`, and `xargs`, `g`-prefixed.
brew install findutils
# Install GNU `sed`, overwriting the built-in `sed`.
brew install gnu-sed --with-default-names2

# Zsh!
brew install zsh

# Install `wget` with IRI support & HTTPIE.
brew install wget --with-iri
brew install httpie

# Install more recent versions of some macOS tools.
brew install vim --with-override-system-vi
mkdir -p ~/.vim/backups
mkdir -p ~/.vim/swaps
mkdir -p ~/.vim/undo
mkdir -p ~/.vim/autoload

brew install grep --with-default-names
brew install openssh
brew install reattach-to-user-namespace

# Install other useful binaries.
brew install ack
brew install git
brew install git-lfs
brew install ssh-copy-id
brew install tree
brew install ngrep

# Remove outdated versions from the cellar.
brew cleanup
