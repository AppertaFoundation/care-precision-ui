#!/bin/sh

WWW_DIR=/usr/share/nginx/html
INJECT_FILE_SRC="${WWW_DIR}/inject.template.js"
INJECT_FILE_DST="${WWW_DIR}/inject.js"

function render_template() {
  eval "echo \"$(cat $1)\""
}

if [ -f "${INJECT_FILE_SRC}" ]; then
    render_template "${INJECT_FILE_SRC}" > "${INJECT_FILE_DST}"
    echo "Environment variable file written"
else
    echo "${INJECT_FILE_SRC} - Template File Not Found!"
fi

[ -z "$@" ] && nginx -g 'daemon off;' || $@