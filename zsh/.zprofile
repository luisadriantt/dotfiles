#!/bin/zsh

# Dont forget to add export ZDOTDIR=$HOME/.config/zsh to /etc/zsh/zshenv
export XDG_CONFIG_HOME=$HOME/.config
export XDG_CACHE_HOME=$HOME/.cache
export XDG_DATA_HOME=$HOME/.local/share
export XAUTHORITY=$XDG_RUNTIME_DIR/Xauthority
export XINITRC=$XDG_CONFIG_HOME/init
export HISTFILE=$XDG_DATA_HOME/zsh/history
export ALSA_CONFIG_PATH=$XDG_CONFIG_HOME/alsa/asoundrc
export CARGO_HOME=$XDG_DATA_HOME:-$HOME/.local/share/cargo
export INPUTRC=$XDG_CONFIG_HOME:-$HOME/.config}/inputrc
export NOTMUCH_CONFIG=$XDG_CONFIG_HOME:-$HOME/.config/notmuch-config
export GTK2_RC_FILES=$XDG_CONFIG_HOME:-$HOME/.config/gtk-2.0/gtkrc-2.0

export WM="bspwm"
export LAYOUT="us,ru"
export PATH=$PATH:$HOME/.local/bin:$HOME/.gem/ruby/2.7.0/bin:$HOME/.npm/node_modules
export TERMINAL="alacritty"
export FMANAGER="ranger"
export EDITOR="vim"
export LAUNCHER="rofi"
export MPLAYER="ncmpcpp"
export READER="zathura"


[ "$(tty)" = "/dev/tty1" ] && ! ps -e | grep -qw Xorg && exec startx "$XDG_CONFIG_HOME/init" -keeptty &> /dev/null
