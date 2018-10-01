for file in ~/.{path,exports,functions,aliases,extra}; do
	[ -r "$file" ] && [ -f "$file" ] && source "$file";
done;
unset file;

# Zgen
source "${HOME}/.zgen/zgen.zsh"

ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=20

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

# Fix Slow AF paste on zsh:
# https://apple.stackexchange.com/posts/315515/revisions

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

export NVM_DIR=~/.nvm
. $(brew --prefix nvm)/nvm.sh
