eval $(/opt/homebrew/bin/brew shellenv)

if [[ "$TERM_PROGRAM" != "WarpTerminal" ]]; then
  PS1='[%2d] '
fi

[[ "$TERM_PROGRAM" == "vscode" ]] && . "/Applications/Visual Studio Code - Insiders.app/Contents/Resources/app/out/vs/workbench/contrib/terminal/common/scripts/shellIntegration-rc.zsh"

for file in ~/.{path,aliases,extra,fuzzyswitch}; do
  [ -r "$file" ] && [ -f "$file" ] && source "$file"
done
unset file

# Zgenom
source "${HOME}/.config/.zgenom/zgenom.zsh"
zgenom autoupdate --background

export GPG_TTY=$(tty)

DISABLE_UPDATE_PROMPT=true
DISABLE_AUTO_UPDATE=true

ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=10

if ! zgenom saved; then

  zgenom ohmyzsh
  zgenom ohmyzsh plugins/asdf
  zgenom ohmyzsh plugins/colored-man-pages
  zgenom ohmyzsh plugins/git
  zgenom ohmyzsh plugins/sudo

  [[ "$(uname -s)" = Darwin ]] && zgenom ohmyzsh plugins/macos

  zgen load zsh-users/zsh-autosuggestions
  zgen load zsh-users/zsh-syntax-highlighting
  zgen load zsh-users/zsh-history-substring-search

  zgenom save
fi

# pnpm
export PNPM_HOME="$HOME/Library/pnpm"
case ":$PATH:" in
*":$PNPM_HOME:"*) ;;
*) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
