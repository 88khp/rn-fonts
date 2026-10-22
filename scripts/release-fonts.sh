#!/usr/bin/env bash
#
# Publishes every font package and the rn-fonts CLI to npm, in order.
#
#   scripts/release-fonts.sh            publish for real, asking for an OTP per package
#   scripts/release-fonts.sh --dry-run  check each package without publishing
#
# Preflight: must be on main, with no local changes, in sync with origin/main,
# and logged in to npm. Versions that are already on npm are skipped.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGES=(
  packages/rn-font-inter
  packages/rn-font-jakartasans
  packages/rn-font-manrope
  packages/rn-font-newsreader
  packages/rn-font-poppins
  tools/rn-fonts
)

DRY_RUN=0
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
fi

cd "$ROOT"

echo "Preflight"

if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "✗ Not on main. Check out main first."
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "✗ Uncommitted changes. Commit or stash them first."
  exit 1
fi

git fetch --quiet origin main
if [[ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]]; then
  echo "✗ main is not in sync with origin/main. Push or pull first."
  exit 1
fi

if ! npm whoami >/dev/null 2>&1; then
  echo "✗ Not logged in to npm. Run: npm login"
  exit 1
fi
echo "✓ on main, clean, in sync with origin, logged in as $(npm whoami)"
echo

for dir in "${PACKAGES[@]}"; do
  name="$(node -p "require('./$dir/package.json').name")"
  version="$(node -p "require('./$dir/package.json').version")"

  if npm view "$name@$version" version >/dev/null 2>&1; then
    echo "• $name@$version is already on npm, skipping"
    continue
  fi

  if [[ $DRY_RUN -eq 1 ]]; then
    echo "→ $name@$version (dry run)"
    (cd "$dir" && npm publish --dry-run --access public >/dev/null)
    echo "  ✓ ok"
    continue
  fi

  echo "→ $name@$version"
  read -r -p "  OTP for $name (6 digits): " otp
  (cd "$dir" && npm publish --access public --otp="$otp")
  echo "  ✓ published $name@$version"
  echo
done

echo "Done."
