gs() {
  fzf-git-branch() {
    git rev-parse HEAD >/dev/null 2>&1 || return

    git branch --color=always --all --sort=-committerdate |
      grep -v HEAD |
      fzf --height 50% --ansi --no-multi --preview-window right:65% \
        --preview 'git log -n 50 --color=always --date=short --pretty="format:%C(auto)%cd %h%d %s" $(sed "s/.* //" <<< {})' |
      sed "s/.* //"
  }

  fzf-git-switch() {
    git rev-parse HEAD >/dev/null 2>&1 || return

    local branch

    branch=$(fzf-git-branch)
    if [[ "$branch" = "" ]]; then
      echo "No branch selected."
      return
    fi

    git switch $branch 2>/dev/null || git switch -c $branch
  }
  fzf-git-switch
}
