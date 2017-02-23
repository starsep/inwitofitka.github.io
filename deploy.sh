#!/bin/bash

DEFAULT_TIME=60

function log {
  echo -e "$1"
}

function error {
  echo -ne "\e[91mBłąd! \e[0m"
  log "$1"
}

function blue_head_body {
  echo -ne "\e[94m$1\e[0m"
  log "$2"
}

function green_head_body {
  echo -ne "\e[92m$1\e[0m"
  log "$2"
}

function check_args {
  if [ $# != 1 ] && [ $# != 2 ] ; then
    error "Zła liczba parametrów.\n"
    blue_head_body "Użycie: " "$0 nazwa [czas]\n"
    blue_head_body "Przykład: " "$0 170223"
    blue_head_body "Przykład: " "$0 fajnyturniej 42"
    green_head_body "\nnazwa " "to nazwa turnieju"
    log "\tnp. data w formacie YYMMDD np. 170223"
    log "\tnie polecam polskich znaków i/lub spacji"
    green_head_body "\nczas " "to opcjonalny argument - czas czekania pomiędzy aktualizacjami"
    log "\tdomyślna wartość to $DEFAULT_TIME"
    exit 1
  fi
}

function delay {
  log "Czekam $1 sekund."
  sleep $1
}

function check_init {
  if [ ! -d $nazwa ]; then
    echo "Nie istnieje katalog $nazwa, tworzę go."
    mkdir $nazwa
    echo "Proszę stworzyć turniej o nazwie $nazwa i zapisać go w $nazwa/$nazwa.rrt"
    echo "oraz ustawić katalog roboczy turnieju na $nazwa"
  fi
}

function deploy {
  git fetch
  git stash
  git rebase master
  git add $name
  current_time=`date "+%Y-%m-%d %H:%M:%S"`
  git commit -m "$name: autoupdate $current_time."
  git push
  git stash apply
  log "Wyniki powinny być na inwitofitka.club/$name"
}

check_args $*

name=$1
time=DEFAULT_TIME

if [ $# = 2 ] ; then
  time=$2
fi

check_init
delay $time

deploy
