#!/usr/bin/env bash

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
brew install gnu-sed --with-default-names

# Install Bash 4.
# Note: don’t forget to add `/usr/local/bin/bash` to `/etc/shells` before
# running `chsh`.
brew install bash
brew install bash-completion@2

# Zsh!
brew install zsh

# Switch to using brew-installed bash as default shell
if ! fgrep -q '/usr/local/bin/bash' /etc/shells; then
  echo '/usr/local/bin/bash' | sudo tee -a /etc/shells;
  chsh -s /usr/local/bin/bash;
fi;

# Install `wget` with IRI support & HTTPIE.
brew install wget --with-iri
brew install httpie

# Install more recent versions of some macOS tools.
brew install vim --with-override-system-vi
brew install grep --with-default-names
brew install openssh

# Ruby
brew install ruby-install
brew install chruby
ruby-install ruby 2.4.1

# Go
brew install go

# Install other useful binaries.
brew install ack
brew install git
brew install git-lfs
brew install git-flow
brew install ssh-copy-id
brew install tree
brew install ngrep

# Remove outdated versions from the cellar.
brew cleanup
