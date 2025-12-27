#!/bin/bash
# https://github.com/docker/for-mac/issues/6921#issuecomment-2409324575

if [ "$#" != "1" ]; then
  echo "Usage: $0 <path/to/program to debug>" >&2
  exit 1
fi

prog=$1
ROSETTA_DEBUGSERVER_PORT=1234 $prog < /dev/tty &
pid=$!
trap "kill $pid 2>/dev/null" EXIT

gdb \
  -iex "file $prog" \
  -iex "target remote localhost:1234"
