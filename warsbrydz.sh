#!/bin/bash
function check_args {
  if [ $# != 1 ] ; then
    echo "Zła liczba parametrów."
    echo "Użycie: $0 YYMMDD"
    echo "Przykład: $0 170315"
    exit 1
  fi
}

check_args "$*"

NAME=$1
DIRECTORY="IF$NAME"
ZIP="$DIRECTORY.zip"

mkdir -p "$DIRECTORY"
echo '<meta http-equiv="refresh" content="0; url=https://inwitofitka.club/'"$NAME"'" />' > "$DIRECTORY/index.html"
zip -r "$ZIP" "$DIRECTORY"
