#!/usr/bin/env bash
# Regenerate references/graphs.md from the published catalog.
# Bundled because some agent fetch proxies are bot-blocked (403) by the
# catalog host; curl passes. Never hand-edit the output.
set -euo pipefail
url="https://buena-mono.buenalabs.io/graphs.md"
out="$(cd "$(dirname "$0")/.." && pwd)/references/graphs.md"
tmp="$(mktemp)"; trap 'rm -f "$tmp"' EXIT
curl -fsS "$url" -o "$tmp"
bytes=$(wc -c < "$tmp" | tr -d ' ')
[ "$bytes" -ge 8000 ] || { echo "sync-catalog: ${bytes} bytes -- too small, refusing" >&2; exit 1; }
head -1 "$tmp" | grep -q '^# Graphs' || { echo "sync-catalog: unexpected body, refusing" >&2; exit 1; }
{
  printf '<!-- GENERATED -- do not hand-edit.\n'
  printf '     Source:    %s\n' "$url"
  printf '     Retrieved: %s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  printf '     Regenerate: scripts/sync-catalog.sh (this skill) -->\n\n'
  cat "$tmp"
} > "$out"
echo "sync-catalog: wrote $out ($bytes bytes + header)"
