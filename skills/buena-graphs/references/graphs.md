<!-- GENERATED -- do not hand-edit.
     Source:    https://buena-mono.buenalabs.io/graphs.md
     Retrieved: 2026-09-04T07:10:51Z
     Regenerate: scripts/sync-catalog.sh (this skill) -->

# Graphs

> Thirty mdx-graphs components rendered as characters on Buena Mono's 618-unit grid — contribution grids, sparklines, plots, trees, gantts and tables, each drawn at build time with no client runtime.

## What this page is

Every component [mdx-graphs](https://mdx-graphs.kshv.me/docs) ships, rendered on this typeface and shown with the code that drew it. The charts are text rather than pictures: no canvas, no SVG, no runtime, so a reader can select a graph and copy its characters straight off the page.

The code beside each graph is generated from the same props the page passes the component, so what a reader copies is what they are looking at rather than a sample that has drifted from it.

Most of the thirty are drawn from measured data — this repository's own commit history, or figures the specimen publishes and sources elsewhere. The rest are marked as sample data on the page itself, because a typeface has no invoice and no uptime to read.

## The components

### The frame

Everything below is drawn inside this. It is worth seeing on its own, because it is the part you compose against when none of the twenty-nine fit.

`Frame` (`Graph`) — Not a graph — the dashed figure the other twenty-nine are drawn inside. Compose it with GraphBody, GraphTitle, GraphRule, GraphTrack and GraphTick to draw one of your own. (sample data)

```text
[ FRAME ]

▁▂▃▅▇█▇▅▃▂▁
a track, a rule, and eleven ticks
```

### Density

Many small cells, where the reading is in the pattern rather than in any one value. These are the graphs that put the most characters on the grid at once.

`Activity` (`GraphActivity`) — A contribution grid. Dated counts in, weeks and intensity derived.

```text
[ COMMITS ]

    Mar    Apr   May    Jun   Jul   Aug
M ·░······················░···░
W ····················░░·░▒░···
F ·░···················░░░░···░
  ·░····················░·░··░·
  ····················░···░·░░·
  ░···················█·░░··░·░
  ▒···················▒·░░·····
243 commits                    Less ·░▒▓█ More
243 contributions across 197 days. 243 commits
```

`Calendar` (`GraphCalendar`) — One month on a seven-column grid, with days marked and one picked out.

```text
[ JULY ]

 M   T   W   T   F   S   S
         1   2   3   4   5
 6   7   8   9   10  11  12
 13  14  15  16  17  18  19
 20  21  22  23  24  25  26
 27  28  29  30  31
July 2026, marked 3, 4, 5, 7, 8, 15, 16, 18, 19, 21, 22, 25, 26, 27, 28, 29, 30, 31
```

`Uptime` (`GraphUptime`) — A status strip — one cell a day, three states and a gap. (sample data)

```text
[ STATUS ]

████████████████▒████████·▒███
█████████▒██
90%               6w ago today
█ up  ▒ slow  · down
90 percent uptime over 42 days, 6w ago to today
```

`Cells` (`GraphCells`) — Small multiples of an on-and-off grid — the same shape drawn once per group, for comparing patterns rather than magnitudes.

```text
[ DAYS WITH A COMMIT ]

· █ ·
· · ·
· █ ·
· █ ·
· · ·
█ · ·
█ · ·
2026-02

· · · · █
· █ · █ █
· █ █ █ █
· · █ · █
█ · · · █
█ · █ █ ·
█ · █ █ ·
2026-07

· · · · █
· █ · · ·
· · · · █
· · · █ ·
· · █ █ ·
· · █ · █
· · · · ·
2026-08
```

`Waffle` (`GraphWaffle`) — A percentage as a block of cells, when a bar would not show the remainder.

```text
[ JULY'S SHARE ]

████████████████████
████████████████████
████████████████████
██████████░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░
70%
169 of 243 commits landed in July
70 percent. 169 of 243 commits landed in July
```

### Series

A sequence over time, at four levels of ceremony — from one line of glyphs to a plot with a scale.

`Spark` (`GraphSpark`) — A sparkline in block glyphs, scaled to its own highest point.

```text
[ PER WEEK ]

▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█▃▂▃▅▁▂▃▁
29 weeks
Sparkline with 29 points. 29 weeks
```

`Plot` (`GraphPlot`) — A line or area plot with a y-scale, for when the magnitude matters.

```text
[ RUNNING TOTAL ]

 243                            ██
                             ███░░
                            █░░░░░
                         ███░░░░░░
                         ░░░░░░░░░
     ████████████████████░░░░░░░░░
   0 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

     2026-02                 2026-08
area plot, 29 points, min 0, max 243
```

`KPI` (`GraphKpi`) — One number with its trend under it — a headline that shows its working.

```text
[ COMMITS ]

243
since the first commit 197 days
▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁█▃▂▃▅▁▂▃▁
243 since the first commit. 197 days
```

`Heatmap` (`GraphHeatmap`) — A punchcard: labelled rows against labelled columns, intensity by glyph.

```text
[ WHEN ]

    00 03 06 09 12 15 18 21
Sun █  ▓  ░  ░  ░  ░  ░  ░
Mon ·  ·  ░  ·  ░  ·  ·  ░
Tue ·  ·  ·  ░  ░  ░  ░  ▓
Wed ░  █  ░  ·  ░  ░  ░  ░
Thu ·  ·  ·  ░  ░  ░  ▒  ░
Fri ·  ·  ·  ·  ░  ░  ░  ░
Sat ▒  ░  ·  ░  ▒  ▒  ▓  ▓
Less ·░▒▓█ More
```

`Slope` (`GraphSlope`) — Two columns and the lines between them — what moved, and which way.

```text
[ METRICS ]

           typical mono   buena
advance             600 →   618
cap height          730 →   699
x-height            550 →   524
```

### Magnitude

Comparing sizes. A bar is a count of block elements, so the length is literal — you can count it.

`Bars` (`GraphBars`) — Two series above and below a label — a before and after of the same categories, with the thing between them named.

```text
[ COMMITS BY AREA ]

█   █
█   █
█   █
█ █ █
█ █ █
before the gap

- - - ▶ four months - - - ▶

█
█   █
█   █
█ █ █
█ █ █
after it
```

`Rank` (`GraphRank`) — An ordered bar list — the shape you want for a top-n.

```text
[ COMMITS BY AREA ]

copy       [====================]  83
machinery  [================----]  66
style      [=====---------------]  20
```

`Meter` (`GraphMeter`) — A single value on a track — the smallest chart that is still a chart.

```text
[ DAYS WORKED ]

[ ====-------------------- ]  16%
32 of 197 days in the span had a commit
16 percent 32 of 197 days in the span had a commit
```

`Bullet` (`GraphBullet`) — Value against target on one track, for a number with something to beat. (sample data)

```text
[ AGAINST TARGET ]

ligatures  [==============|=----]  159 / 140
features   [=============|===---]    51 / 40
weights    [================|---]      8 / 8
```

`Stack` (`GraphStack`) — Parts of a whole, one row per group. The palette that earns three hues.

```text
[ BY AREA ]

2026-02  ██████████▓▓▒▒▒▒▒▒▒▒
2026-06  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
2026-07  ██████████▓▓▒▒▒▒▒▒▒▒
2026-08  █████████▓▒▒▒▒▒▒▒▒▒▒

█ copy  ▓ style  ▒ machinery
```

`Funnel` (`GraphFunnel`) — Steps that only ever narrow, with the drop shown at each one. (sample data)

```text
[ GLYPH PIPELINE ]

drawn   ████████████████████  5,406
spaced  ████████████████████  5,406  100%
kerned  ██████████████------  3,820   71%
hinted  ████████████--------  3,120   58%
```

`Waterfall` (`GraphWaterfall`) — How a total was arrived at — a start, the moves, and where it landed. (sample data)

```text
[ GLYPH COUNT ]

latin        ████████████------------  1,280
cyrillic     ------------████--------   +420
greek        ----------------███-----   +310
box + block  -------------------███--   +220
braille      ----------------------██   +256
deduped      ----------------------██   −180
shipped      ██████████████████████--  2,306
latin 1,280, cyrillic +420, greek +310, box + block +220, braille +256, deduped −180, shipped 2,306
```

### Structure

Shape rather than quantity: what contains what, what follows what, what runs alongside what.

`Tree` (`GraphTree`) — A hierarchy in branch glyphs, with one node carrying the accent.

```text
[ SRC ]

src/
├─ components/  9
│  ├─ graphs/   35
│  └─ ui/       4
├─ lib/         19
├─ pages/       13
└─ styles/      1
Tree with 7 nodes
```

`Flow` (`GraphFlow`) — Nodes on dashed arrows. Rows read left to right; one path can be accented.

```text
[ BUILD ]

graphs.astro - - - ▶ React SSR - - - ▶ characters

global.css - - - ▶ Tailwind - - - ▶ one stylesheet

dist/ ▶ Pages                       - - - ▶ reader
```

`Timeline` (`GraphTimeline`) — Dated events down a connector, with done, current and upcoming states.

```text
[ ANCESTRY ]

●  1955  Courier
│
●  1968  OCR-B
│
●  2008  Nitti
│
●  2014  Fira Code
│
●  2026  Buena Mono
```

`Gantt` (`GraphGantt`) — Bars on a shared track, measured from day counts rather than drawn.

```text
[ RELEASE ]

drawing  ██████████████----------------
spacing  --------------██████████------
hinting  ------------------------██████
         jan           feb          mar
```

### Tabular

Rows and columns, where the frame is doing the work of a table rather than of a chart. The last one is not a chart at all.

`Table` (`GraphTable`) — A plain table inside the frame, with per-column alignment and a footer.

```text
[ METRICS ]

metric      typical  buena
cap height      730    699
x-height        550    524
advance         600    618
ligatures       139    159
features         37     51
```

`Compare` (`GraphCompare`) — A feature matrix. Booleans draw as ✓ and –; one column takes the accent.

```text
[ FEATURES ]

                JetBrains  iA Writer  Fira Code  Cascadia  buena
Ligatures               ✓          –          ✓         ✓      ✓
Small caps              –          –          –         –      ✓
Braille set             –          –          –         ✓      ✓
Ligature count        139          0        125         —    159
OT features            37         16         26        24     51
```

`Spec` (`GraphSpec`) — A definition list — labels down the left, values right, one accented.

```text
[ BUENA MONO ]

advance     618
cap height  699
x-height    524
glyphs      5,406
languages   971
```

`Stat` (`GraphStat`) — A row of headline figures, each with a label and an optional hint.

```text
[ AT A GLANCE ]

5,406      159        51        971
glyphs     ligatures  features  languages
3 scripts
```

`Diff` (`GraphDiff`) — Added, removed and unchanged rows, with a total at the bottom. (sample data)

```text
[ SINCE 1.0 ]

+ braille patterns  +256
+ coding ligatures   +20
- legacy alternates  −48
  small caps         923
+ glyphs            +228
```

`Invoice` (`GraphInvoice`) — A document rather than a chart — the frame doing receipts and statements. (sample data)

```text
[ INVOICE ]

FROM                BILL TO
Buena Labs          Sample Client
hello@buenalabs.io  Somewhere

NUMBER   ISSUED
BL-0042  2026-08-01

Description          Qty  Rate  Amount
Type design — latin   40   120   4,800
Spacing and kerning   18   120   2,160
Hinting               12   120   1,440

subtotal  8,400
total     8,400

Sample data — this one is a layout, not a measurement.
```

### Clock

The two that read the time. Every other component on this page finishes rendering at build time and needs nothing to run; these two do not.

`Timer` (`GraphTimer`) — Elapsed time, time since, or a wall clock. (sample data)

```text
[ ELAPSED ]

00:00:00
since the last release
timer
```

`Countdown` (`GraphCountdown`) — Time remaining until an instant, with a message for when it lands. (sample data)

```text
[ UNTIL ]

00:00:00
next release window
remaining 00:00:00
```

## Installing them

mdx-graphs is shadcn-registry copy-in rather than an npm package, so the components land in your repository: `pnpm dlx shadcn@latest add https://mdx-graphs.kshv.me/r/graph-spark.json`, or `all` for the set.

The copy used here is vendored with four documented edits: the imports point at siblings, colour is bound to this site's tokens rather than the library's, nothing is dimmed below the 4.5:1 contrast floor, and the animation runtime is replaced by a static shim so the graphs render at build time and ship as characters.

---

Canonical: https://buena-mono.buenalabs.io/graphs
