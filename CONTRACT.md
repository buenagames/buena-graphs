# The frame contract

> The plain-text grammar of a buena-graphs figure: what a generator
> must emit and what a renderer may rely on.

**Version:** 1.0.2
**Last updated:** 2026-09-04
**Consumers:** mrkdwn, and any tool that upgrades the
rendering of a catalog-true figure.
**Source of truth for examples:** the published catalog,
<https://buena-mono.buenalabs.io/graphs.md> — thirty components, each
with an official text twin. Every rule below is *measured* against
all thirty (2026-09-04); none is asserted from taste.

## What this contract is for

A figure is ordinary text inside an ordinary fenced block. Most tools
show it as-is, which is the point. A tool that knows this contract —
mrkdwn first — may *recognize* a figure and upgrade its rendering:
set it on Buena Mono, treat the frame as a figure, style the legend.
The contract defines exactly when recognition is allowed and what the
recognizer may assume, so an upgraded rendering can never misread a
block that merely looks similar.

## Detection (normative)

A fenced code block with info string `text` is a **candidate figure**
if and only if:

1. Its first non-empty line matches the title grammar below, and
2. the line immediately after the title is blank.

Both properties hold in 30 of 30 catalog twins (measured 2026-09-04).
On any violation of this contract — at detection or anywhere in the
body — a renderer MUST fall back to rendering the block as plain
fenced text. Recognition failure is silent; it is never an error the
reader sees.

A renderer MUST NOT alter document bytes. Recognition changes how a
figure is drawn, never what is stored.

## The title (normative)

```text
[ STATUS ]
[ COMMITS BY AREA ]
[ JULY'S SHARE ]
```

Grammar, as a regular expression over one line:

```text
^\[ [A-Z0-9 ,.'&/-]+ \]$
```

Uppercase letters, digits, spaces and the punctuation set measured
across the thirty titles. Lowercase inside the brackets is a contract
violation: generators write titles in caps, and the constraint is
what keeps false positives near zero for detectors.

## The body (normative)

The body is lines of printable ASCII plus, exclusively, this measured
character inventory — twenty-one characters, counted so no prose
about this contract miscounts them again:

```text
█ ▓ ▒ ░ · ▁ ▂ ▃ ▅ ▇ ─ │ ├ └ ● ▶ ✓ → – — −
```

A candidate figure containing any other non-ASCII character is not
catalog-true; the renderer falls back. The inventory grows only with
a MINOR version of this contract, and never loses a character except
at a MAJOR.

## The families (informative)

What the characters mean by family, each cited to a catalog twin:

| Family | Characters | Catalog citation |
|---|---|---|
| Status strip | `█ ▒ ·` cells, one per unit of time, plus a legend line (`█ up  ▒ slow  · down`) | `[ STATUS ]` (Uptime) |
| Density grid | `· ░ ▒ ▓ █` intensity cells, legend `Less ·░▒▓█ More` | `[ COMMITS ]` (Activity) |
| Track / spark | `▁ ▂ ▃ ▅ ▇ █` height cells on one line | `[ FRAME ]`, sparklines |
| Bars / gantt | `█` runs on a `-` track, label column left, axis line below | `[ RELEASE ]` (Gantt) |
| Tree / structure | `─ │ ├ └` box-drawing connectors | tree twins |
| Marks | `● ▶ ✓ → – — −` point, pick, check, flow and range marks | plots, timelines, diffs of state |

Families are informative: a renderer may use them to style parts of a
figure, but detection and fallback depend only on the normative
sections above.

## Trailing prose (normative)

Twins may end with one or more plain summary lines (the accessible
reading of the figure — e.g. `90 percent uptime over 42 days`). These
lines are part of the figure and are rendered with it; a renderer
MUST NOT strip or truncate them.

## Implementations (informative)

| Renderer | Contract version | Where |
|---|---|---|
| mrkdwn (`TextFigure`, Core/Markdown) | 1.0.0 | Recognises all thirty catalog twins; strict on title case and the exact `text` info string; silent, total fallback |

One interpretation from that implementation, recorded here so the next
renderer reads the same contract: the body clause's fallback is about
non-ASCII characters outside the inventory. ASCII control characters
(a stray tab) are not part of the grammar generators emit, and a
renderer MAY tolerate them rather than fall back — tolerating them
cannot reclassify a catalog-true figure, which never contains them.

## Versioning

Semver, applied to renderer-visible behavior:

- **MAJOR** — detection or inventory changes that can reclassify an
  existing block (either direction).
- **MINOR** — additions that cannot: a new inventory character, a new
  family, a loosened title charset.
- **PATCH** — wording; behavior identical.

Renderers pin the MAJOR and state the version they implement.

## Provenance

| Claim | Basis |
|---|---|
| Title grammar; 30/30 titles match | **Measured** 2026-09-04 against the catalog |
| Blank line after title, 30/30 | **Measured** 2026-09-04 |
| Character inventory, complete | **Measured** 2026-09-04 — union of all non-ASCII characters across the thirty twins |
| Family/character pairings | **Read** 2026-09-04 from the catalog's own sections |
| Inventory count: 21, all natively covered by Buena Mono 1.233 | **Measured** 2026-09-04 — fontTools cmap check against the 5406-glyph build |
| First-consumer validation: 30/30 twins recognised under this contract | **Read** 2026-09-04 from mrkdwn's TextFigureTests |

Last verified: 2026-09-04.
