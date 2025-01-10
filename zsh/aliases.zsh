# Trim new lines and copy to clipboard
alias c="tr -d '\n' | pbcopy"

# Update installed Ruby gems, Homebrew, npm, and their installed packages
alias update='brew update; brew upgrade; brew cleanup; omz update; zgenom selfupdate; zgenom update; zgenom reset; asdf install nodejs lts'

# IP addresses
alias myip="dig +short myip.opendns.com @resolver1.opendns.com"
alias localip="ipconfig getifaddr en0"
alias ip="ifconfig -a | grep -o 'inet6\? \(addr:\)\?\s\?\(\(\([0-9]\+\.\)\{3\}[0-9]\+\)\|[a-fA-F0-9:]\+\)' | awk '{ sub(/inet6? (addr:)? ?/, \"\"); print }'"
alias ips="myip && ip"

# Flush Directory Service cache
alias flush="dscacheutil -flushcache && killall -HUP mDNSResponder && echo flushed"

# Recursively delete `.DS_Store` files
alias cleanup="find . -type f -name '*.DS_Store' -ls -delete"

# Empty the Trash on all mounted volumes and the main HDD
# Also, clear Apple’s System Logs to improve shell startup speed
alias clearsystemlogs="sudo rm -rfv /private/var/log/asl/*.asl; sqlite3 ~/Library/Preferences/com.apple.LaunchServices.QuarantineEventsV* 'delete from LSQuarantineEvent'"

# code-insiders is too wordy!
alias ci="code-insiders"

# Easier navigation: .., ..., ...., ....., ~ and -
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."
alias ~="cd ~" # `cd` is probably faster to type though
alias -- -="cd -"

# Shortcuts
alias dl="cd ~/Downloads"
alias d="cd ~/Documents"
alias p="cd ~/Documents/Projects"
alias desk="cd ~/Desktop"
alias g="git"
alias h="history"
alias j="jobs"

colorflag="--color=auto"
export LSCOLORS='BxBxhxDxfxhxhxhxhxcxcx'

# List all files colorized in long format
alias l="ls -aCF ${colorflag}"
# List all files colorized, including dot files
alias la="ls -lAF ${colorflag}"
# List only directories
alias lsd="ls -lF ${colorflag} | grep --color=never '^d'"
# Always use color output for `ls`
alias ls="command ls ${colorflag}"

# Enable aliases to be sudo’ed
alias sudo='sudo '

# Toggle Handoff
alias handoff="defaults -currentHost write com.apple.coreservices.useractivityd ActivityAdvertisingAllowed -bool no; defaults -currentHost write com.apple.coreservices.useractivityd ActivityReceivingAllowed -bool no"
alias handon="defaults -currentHost write com.apple.coreservices.useractivityd ActivityAdvertisingAllowed -bool yes; defaults -currentHost write com.apple.coreservices.useractivityd ActivityReceivingAllowed -bool yes"
alias ho="handoff; handon"

# Always enable colored `grep` output
# Note: `GREP_OPTIONS="--color=auto"` is deprecated, hence the alias usage.
alias grep='grep --color=auto'
alias fgrep='fgrep --color=auto'
alias egrep='egrep --color=auto'

# macOS has no `md5sum`, so use `md5` as a fallback
command -v md5sum >/dev/null || alias md5sum="md5"
command -v sha1sum >/dev/null || alias sha1sum="shasum"
