# The prose-and-graphs grammar shipped

The grammar shipped end to end in one day: the convention, both
skills, the package with its contract, and a renderer that recognizes
the figures — twenty PRs across five repos, with one PR deliberately
held for launch. This report is itself the sample: written under the
convention, drawn from the catalog, contract-valid throughout.

## The day in phases

Four phases ran nearly back to back from the evening of September 3
to noon on September 4. The convention came first because every later
piece points at it; the renderer came last because it needed the
contract the package publishes.

```text
[ THE DAY IN PHASES ]

convention  -------------██████-----------
skill       ------------------███---------
package     --------------------█████-----
renderer    ------------------------██████
            sep 3                    sep 4
Four phases over roughly 24 hours, sep 3 evening to sep 4 noon.
```

The handoffs were real dependencies, not ceremony: the skill applies
the convention by reference, the package's contract is what the
renderer pins, and the renderer's tests read the package's catalog.

## What the evals measured

Both skills ran the with-versus-without loop before shipping: clean
subagents, same prompts, graded expectations. The skill's absence is
the baseline, and in both cases the baseline lost.

```text
[ EVALS, EXPECTATIONS PASSED ]

in-house, baseline    [===============-----]  12/16
in-house, with skill  [===================-]  15/16
public, baseline      [========------------]   4/10
public, with skill    [================----]   8/10
With the eval-earned fixes verified by re-run: 16/16 and 10/10.
```

Every miss became a fix before release: a chooser row the in-house
skill lacked, an inventory rule and a values-must-appear rule the
public skill lacked. The evals paid for themselves twice over.

## What changed where

One repo is new; the others gained their pieces in place. The site
keeps its measured specimen content and stays the catalog surface —
only the components and the text engine moved.

```diff
 buenagames/
 ├── studio/                    conventions/agent-prose.md, spec-kit
 ├── skills/                    prose-graphs 1.1.0, eval records
+├── buena-graphs/              CONTRACT.md 1.0.1, registry, public skill
 ├── buena-mono.buenalabs.io/   the specimen site; package switch staged
 └── mrkdwn/                    TextFigure, contract 1.0.0 pinned
```

## Where it stands

```text
[ SHIPPED ]

20          5        30       1
prs merged  repos    twins    pr held
the held PR is the site's package switch, merged at launch
```

Phase D — public repo, npm publish, the outside-org install tests —
is the only remaining work, and it is a sequence, not a build.

---

Numbers measured 2026-09-04 from PR merges, eval records, and the
published catalog. This document doubles as the gold-standard example
for the `buena-graphs` skill: three catalog-true figures a contract
renderer recognizes, one `diff` code shape it correctly leaves alone,
prose between every figure, never more than two per section.
