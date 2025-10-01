#!/bin/bash

# Wrapper script for Sandman documentation site build
# This script calls the main build script from the sandman repository

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SANDMAN_SCRIPT="$(cd "$SCRIPT_DIR/../../sandman/scripts" && pwd)/build_site.sh"

if [ ! -f "$SANDMAN_SCRIPT" ]; then
    echo "❌ Main build script not found: $SANDMAN_SCRIPT"
    echo "Please ensure the sandman repository is available at the expected location."
    exit 1
fi

echo "🚀 Calling main build script from sandman repository..."
exec "$SANDMAN_SCRIPT" "$@"
