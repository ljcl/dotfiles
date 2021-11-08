sudo -v

read -q "INSTALL_APPS?Install CLI & GUI apps with Homebrew ?"
INSTALL_APPS=${INSTALL_APPS:-n}

if [[ "$INSTALL_APPS" =~ ^(y|Y)$ ]]; then
  echo
  echo -e "\033[1m\033[34m==> Installing brew\033[0m"
  if [[ $(which brew) == "/usr/local/bin/brew" ]]; then
    echo "Brew installed already, skipping"
  else
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  fi
  echo -e "\033[1m\033[34m==> Installing brew formulae\033[0m"
  brew bundle --file=~/.config/Brewfile

  ## Write some empty directories for VIM
  mkdir -p ~/.vim/backups
  mkdir -p ~/.vim/swaps
  mkdir -p ~/.vim/undo
  mkdir -p ~/.vim/autoload

  echo "Install Separately:"
  echo "- Warp terminal"
  echo "- Soulver 3"
fi

## Set Config Directory for Hammerspoon
defaults write org.hammerspoon.Hammerspoon MJConfigFile "~/.config/hammerspoon/init.lua"

echo
echo -e "\033[1m\033[34m==> gitconfig\033[0m"
ln -sf ~/.config/git/gitconfig ~/.gitconfig
ln -sf ~/.config/git/gitignore ~/.gitignore

echo
echo -e "\033[1m\033[34m==> Vim\033[0m"
ln -sf ~/.config/vim/vimrc.vim ~/.vimrc

echo
echo -e "\033[1m\033[34m==> ZSH\033[0m"
git clone https://github.com/jandamm/zgenom.git "${HOME}/.config/.zgenom"

ln -sf ~/.config/zsh/zshrc.zsh ~/.zshrc
ln -sf ~/.config/zsh/hushlogin ~/.hushlogin
ln -sf ~/.config/zsh/path.zsh ~/.path
ln -sf ~/.config/zsh/inputrc ~/.inputrc
ln -sf ~/.config/zsh/aliases.zsh ~/.aliases

echo
echo -e "\033[1m\033[34m==> Warp\033[0m"
ln -sf ~/.config/warp ~/.warp

echo
echo -e "\033[1m\033[34m==> JS / Node\033[0m"
git clone https://github.com/nvm-sh/nvm.git "${HOME}/.config/.nvm"
ln -sf ~/.config/js/editorconfig ~/.editorconfig

echo
echo -e "\033[1m\033[34m==> Tmux\033[0m"
ln -sf ~/.config/tmux/tmux.conf ~/.tmux.conf

echo
echo -e "\033[1m\033[34m==> Mac Settings\033[0m"

read -q "MACOS_DEFAULTS?Set some nice macos defaults ?"
MACOS_DEFAULTS=${MACOS_DEFAULTS:-n}

if [[ "$MACOS_DEFAULTS" =~ ^(y|Y)$ ]]; then
  source .macos
fi
echo

echo "Don't forget to set git username & email (see README.md) via the .extra file"
