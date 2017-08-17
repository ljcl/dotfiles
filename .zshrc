# Homebrew
export PATH="/usr/local/bin:$PATH"
export PATH="/usr/local/sbin:$PATH"

# Zgen
source "${HOME}/.zgen/zgen.zsh"

# vim
export EDITOR="/usr/local/bin/vim"

# PHP7 CLI
export PATH="$(brew --prefix homebrew/php/php70)/bin:$PATH"

# Exports
export CHEATCOLORS=true

# if the init scipt doesn't exist
if ! zgen saved; then

  # Oh My Zsh
  zgen oh-my-zsh
  zgen oh-my-zsh plugins/git
  zgen oh-my-zsh plugins/npm
  zgen oh-my-zsh plugins/history
  zgen oh-my-zsh plugins/colored-man-pages
  # zgen oh-my-zsh plugins/pip
  zgen oh-my-zsh plugins/git-flow
  zgen oh-my-zsh plugins/rsync
  # zgen oh-my-zsh plugins/bundler
  # zgen oh-my-zsh plugins/rake
  zgen oh-my-zsh plugins/git-extras
  # zgen oh-my-zsh plugins/heroku
  zgen oh-my-zsh plugins/sublime
  zgen oh-my-zsh plugins/command-not-found
  # zgen oh-my-zsh plugins/aws
  zgen oh-my-zsh plugins/brew
  # zgen oh-my-zsh plugins/brew-cask
  # zgen oh-my-zsh plugins/frontend-search
  zgen oh-my-zsh plugins/httpie
  zgen oh-my-zsh plugins/nvm
  # zgen oh-my-zsh plugins/osx
  zgen oh-my-zsh plugins/tmux

  # Non oh-my-zsh plugins
  zgen load bobthecow/git-flow-completion
  zgen load kennethreitz/autoenv
  zgen load djui/alias-tips
  zgen load zsh-users/zsh-completions src

  # Pure Theme
  zgen load mafredri/zsh-async
  zgen load sindresorhus/pure

  # Syntax highlighting bundle and autosuggest.
  zgen load zsh-users/zsh-autosuggestions
  zgen load zsh-users/zsh-syntax-highlighting
  zgen load zsh-users/zsh-history-substring-search

  # generate the init script from plugins above
  zgen save
fi

# Vi Mode
# set -o vi

# Alt to navigate word in iTerm
bindkey "^[[1;3C" forward-word
bindkey "^[[1;3D" backward-word

# Weird delete key behaviour
# bindkey "^[[3~" delete-char

# Zsh History Substring Search
zmodload zsh/terminfo
bindkey "$terminfo[kcuu1]" history-substring-search-up
bindkey "$terminfo[kcud1]" history-substring-search-down
bindkey -M vicmd 'k' history-substring-search-up
bindkey -M vicmd 'j' history-substring-search-down

# Chruby
source $HOME/.chruby

# Aliases
source $HOME/.aliases

# iTerm Intergration
source $HOME/.iterm2_shell_integration.zsh

# NVM Intergration
export NVM_DIR="${HOME}/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[[ -s "$HOME/.avn/bin/avn.sh" ]] && source "$HOME/.avn/bin/avn.sh" # load avn
