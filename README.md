# Luke's dotfiles

## Installation

### Using Git and the install script

You should clone the repository into into a directory named `.config`. The bootstrapper script will symlink all extra files where they're expected by applications.

```shell
git clone https://github.com/ljcl/dotfiles.git .config && cd .config && zsh ./install.zsh
```

To update, `cd` into this directory repository and run:

```shell
zsh ./install.zsh
```

### Add custom commands without creating a new fork

If `~/.extra` exists, it will be sourced along with the other files:

```shell
GIT_AUTHOR_NAME="Luke Clark"
GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
GIT_AUTHOR_EMAIL="luke@lukeclark.com.au"
GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
GIT_SIGNING_KEY="GPGSIGNKEY"
```

Create a `~/.gitconfig-user` to include the [user] block of .gitconfig

```shell
[user]
	name = Luke Clark
	email = email@example.org
	signingkey = KEY
```

### Sensible macOS defaults

When setting up a new Mac, you may want to set some sensible macOS defaults:

```bash
./.macos
```
