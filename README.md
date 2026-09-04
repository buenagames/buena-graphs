# buena-graphs

Text-first graphs on the Buena Mono grid: thirty React components,
each with an official plain-text twin — the same characters read in a
terminal, on GitHub, and render natively in mrkdwn.

**Status: private until launch.** The components and the text engine
were extracted from the buena-mono specimen site, which remains the
catalog's publishing surface at
<https://buena-mono.buenalabs.io/graphs.md>. What exists here today:
the frame contract, the components and text engine, the generated
registry, and the agent skill.

## What ships from this repo

| Artifact | What it is |
|---|---|
| [`CONTRACT.md`](CONTRACT.md) | The frame contract — the text grammar a renderer may rely on, semver'd |
| `src/` | Components + text renderer (Phase B, moving from the site repo) |
| `r/*.json` | shadcn-compatible registry, generated at build (Phase B) |
| `graphs.md`, `llms.txt` | The catalog, generated at build (Phase B) |
| `skills/buena-graphs/` | Agent skill, `npx skills add buenagames/buena-graphs` (Phase C) |

## Licensing — read this once

The **code** in this repository is MIT-licensed (see
[`LICENSE`](LICENSE)). The **Buena Mono typeface** is a separate work
under its own license and is not contained in, nor licensed by, this
repository. The graphs are drawn *for* the typeface's grid; they do
not include it.

The components derive from
[mdx-graphs](https://github.com/keshav-exe/markdown-graphs)
(MIT, Copyright (c) 2026 Keshav Bagaade), carried here as a documented
fork — the edits are listed at the top of
[`src/components/index.ts`](src/components/index.ts). The registry's
default theme values come from the same source
([`scripts/registry-theme.json`](scripts/registry-theme.json)).

A buena-graphs figure is readable with no framework at all — and
renderers that know [the contract](CONTRACT.md) upgrade it.
