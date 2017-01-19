for file in ~/.{path,aliases,extra}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file"
done
unset file

# Zgenom
source "${HOME}/.config/.zgenom/zgenom.zsh"
zgenom autoupdate --background

export NVM_DIR="$HOME/.config/.nvm"

DISABLE_UPDATE_PROMPT=true
DISABLE_AUTO_UPDATE=true

ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=10

if ! zgenom saved; then

  zgenom ohmyzsh
  zgenom ohmyzsh plugins/colored-man-pages
  zgenom ohmyzsh plugins/git
  zgenom ohmyzsh plugins/sudo

  [[ "$(uname -s)" = Darwin ]] && zgenom ohmyzsh plugins/osx

  # zgen load /Users/clarkl8n/zsh-nvm.plugin.zsh
  # zgen load zsh-users/zsh-autosuggestions
  # zgen load zsh-users/zsh-syntax-highlighting
  # zgen load zsh-users/zsh-history-substring-search

  zgenom save
fi

# Starship theme
# eval "$(starship init zsh)"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
