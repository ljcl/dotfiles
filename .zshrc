for file in ~/.{path,exports,functions,aliases,extra}; do
	[ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
unset file;

# Zgen
source "${HOME}/.zgen/zgen.zsh"

# if the init scipt doesn't exist
if ! zgen saved; then

  # Oh My Zsh
  zgen oh-my-zsh
  zgen oh-my-zsh plugins/git
  zgen oh-my-zsh plugins/npm
  zgen oh-my-zsh plugins/history
  zgen oh-my-zsh plugins/colored-man-pages
  zgen oh-my-zsh plugins/git-extras
  zgen oh-my-zsh plugins/sublime
  zgen oh-my-zsh plugins/tmux
  zgen oh-my-zsh plugins/chruby

  # Non oh-my-zsh plugins
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
#chruby ruby-2.4.1

# Defer initialization of nvm until nvm, node or a node-dependent command is
# run. Ensure this block is only run once if .bashrc gets sourced multiple times
# by checking whether __init_nvm is a function.
if [ -s "$HOME/.nvm/nvm.sh" ] && [ ! "$(whence -w __init_nvm)" = function ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
  declare -a __node_commands=('nvm' 'node' 'npm' 'yarn' 'gulp' 'grunt' 'webpack')
  function __init_nvm() {
    for i in "${__node_commands[@]}"; do unalias $i; done
    . "$NVM_DIR"/nvm.sh
    export NODE_PATH="${NVM_BIN}/node"
    unset __node_commands
    unset -f __init_nvm
  }
  for i in "${__node_commands[@]}"; do alias $i='__init_nvm && '$i; done
fi
