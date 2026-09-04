# buena-graphs

Text-first graphs on the Buena Mono grid: thirty React components,
each with an official plain-text twin — the same characters read in a
terminal, on GitHub, and render natively in mrkdwn.

**Status: private until launch.** The extraction from
`buena-mono.buenalabs.io` (which currently owns the components and
text renderer) is phased in
`specs/002-graphs-package/plan.md` of that repo. What exists here
today: the frame contract.

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
