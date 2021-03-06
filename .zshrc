if [ -f /etc/profile ]; then
  PATH=""
  source /etc/profile
fi

for file in ~/.{path,exports,functions,aliases,extra}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file"
done
unset file

DISABLE_UPDATE_PROMPT=true
DISABLE_AUTO_UPDATE=true

# Zgen
source "${HOME}/.zgen/zgen.zsh"

ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=20

# if the init scipt doesn't exist
if ! zgen saved; then

  # Oh My Zsh
  zgen oh-my-zsh
  zgen oh-my-zsh plugins/colored-man-pages

  # Non oh-my-zsh plugins
  zgen load lukechilds/zsh-nvm

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
set -o vi

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
