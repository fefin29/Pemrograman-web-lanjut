#!/bin/bash

README_FILE="README.md"
CSV_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vTT8lTSHbTGloPzDir-FoiMUxeZlfgC9DvgkC2e04oSS5OqWKo-fAKCOsF8YIaCU3VSMlTzouL29Jxn/pub?gid=0&single=true&output=csv"
CACHE_FILE="nims.csv"

# create a temp file robustly (macOS and Linux mktemp variants), fallback to /tmp
TMPFILE="$(mktemp 2>/dev/null || mktemp -t nims 2>/dev/null || printf '/tmp/nims_%s.csv' "$$")"
# ensure the temp file exists and is writable
if ! touch "$TMPFILE" 2>/dev/null; then
    echo "Error: cannot create temp file at $TMPFILE" >&2
    exit 1
fi

# cleanup function to remove TMPFILE only if it exists
cleanup() {
    if [ -n "$TMPFILE" ] && [ -e "$TMPFILE" ]; then
        rm -f -- "$TMPFILE"
    fi
}
trap cleanup EXIT

# Fetch CSV robustly to a temp file, follow redirects, retry on transient failures
if ! curl -fS --retry 3 --retry-delay 2 -L --connect-timeout 10 --max-time 30 -o "$TMPFILE" "$CSV_URL"; then
    echo "Warning: failed to fetch CSV from remote. Trying local cache ($CACHE_FILE)..." >&2
    if [ -f "$CACHE_FILE" ]; then
        cp "$CACHE_FILE" "$TMPFILE"
    else
        echo "Error: could not fetch CSV and no cache available." >&2
        exit 1
    fi
else
    # update cache on successful fetch
    cp "$TMPFILE" "$CACHE_FILE"
fi

# Parse first column, skip header, handle quoted fields, strip CR and quotes, remove empty lines
NIMS=$(awk -F',' 'NR>1 {
    field=$1;
    gsub(/\r/,"",field);
    # remove surrounding quotes if present
    if (field ~ /^".*"$/) {
        field = substr(field, 2, length(field)-2)
    }
    # trim leading/trailing space
    sub(/^[ \t\r\n]+/, "", field);
    sub(/[ \t\r\n]+$/, "", field);
    if (field != "") print field;
}' "$TMPFILE")

if [ -z "$NIMS" ]; then
    echo "Error: no NIMs parsed from CSV." >&2
    exit 1
fi

# Fetch origin/tutor so we can inspect its files (works on self-hosted and GH runners)
git fetch -q origin tutor || {
    echo "Error: failed to fetch origin/tutor" >&2
    exit 1
}

# Detect available week numbers from tutor branch by locating week*/tests/*
# Produces a sorted, unique list of numeric week values (e.g., 2 3 4 5 ...)
WEEK_NUMS=()
while IFS= read -r w; do
    [[ -n "$w" ]] && WEEK_NUMS+=("$w")
done < <(
    git ls-tree -r --name-only origin/tutor \
      | awk -F/ '/^week[0-9]+\/tests\//{print $1}' \
      | sed -E 's/^week([0-9]+)$/\1/' \
      | sort -n -u
)

if [ "${#WEEK_NUMS[@]}" -eq 0 ]; then
    echo "Error: no week directories with tests found on tutor branch." >&2
    exit 1
fi

# Build a table for an explicit list of week numbers (variable-length)
build_table_weeks() {
    local weeks=("$@")
    local HEADER="|NIM"
    local SEPARATOR="|--"
    for W in "${weeks[@]}"; do
        HEADER+="|Week ${W}"
        SEPARATOR+="|--"
    done
    HEADER+="|"
    SEPARATOR+="|"

    local ROWS=""
    for NIM in $NIMS; do
        local ROW="|${NIM}"
        for W in "${weeks[@]}"; do
            local BADGE="[![week${W}_${NIM}](https://github.com/unram-if/pwl25-a/actions/workflows/week${W}_${NIM}.yml/badge.svg)](https://github.com/unram-if/pwl25-a/actions/workflows/week${W}_${NIM}.yml)"
            ROW+="|${BADGE}"
        done
        ROW+="|"
        ROWS+="$ROW"$'\n'
    done

    echo -e "$HEADER\n$SEPARATOR\n$ROWS"
}

# Chunk weeks into groups (default size = 3) and render tables
CHUNK_SIZE="${CHUNK_SIZE:-3}"
SECTIONS=""
total="${#WEEK_NUMS[@]}"
i=0
while [ $i -lt $total ]; do
    # slice weeks for this chunk
    chunk=( )
    for ((j=0; j<CHUNK_SIZE && (i+j)<total; j++)); do
        chunk+=("${WEEK_NUMS[$((i+j))]}")
    done
    # Guard: skip if chunk is empty (shouldn't happen, but be safe)
    if [ ${#chunk[@]} -eq 0 ]; then
        break
    fi
    start="${chunk[0]}"
    # Bash doesn't support negative indices; compute last index explicitly
    end_index=$(( ${#chunk[@]} - 1 ))
    end="${chunk[$end_index]}"
    SECTIONS+=$'\n'"### Weeks ${start}-${end}"$'\n\n'
    SECTIONS+="$(build_table_weeks "${chunk[@]}")"$'\n'
    i=$((i+CHUNK_SIZE))
done

# Write to README.md
cat > "$README_FILE" <<EOF
# Advanced Web Programming (A)

> [!CAUTION]
> Do not push into this main branch, create a new branch using your own ID and push your changes there!

[![Generate and Commit Markdown Reports](https://github.com/unram-if/pwl25-a/actions/workflows/update.yml/badge.svg)](https://github.com/unram-if/pwl25-a/actions/workflows/update.yml)

## Status Table
$SECTIONS
EOF

echo "Updated README.md with dynamic tables for detected weeks on tutor branch."