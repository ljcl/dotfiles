export POWERLEVEL9K_INSTANT_PROMPT='quiet'

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

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
  zgenom ohmyzsh plugins/sudo

  [[ "$(uname -s)" = Darwin ]] && zgenom ohmyzsh plugins/macos

  zgenom load romkatv/powerlevel10k powerlevel10k
  zgenom load zsh-users/zsh-autosuggestions
  zgenom load zsh-users/zsh-syntax-highlighting
  zgenom load zsh-users/zsh-history-substring-search

  zgenom save
fi

. /opt/homebrew/opt/asdf/libexec/asdf.sh

# pnpm
export PNPM_HOME="$HOME/Library/pnpm"
case ":$PATH:" in
*":$PNPM_HOME:"*) ;;
*) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

export PATH="$PATH:$HOME/.local/bin"
