// Generate docs/components.md: every component's title, description,
// and its full compiled type declarations, verbatim -- the props
// contract as TypeScript states it, not as prose paraphrases it.
// Generated from dist/ (build first); CI fails if the committed doc
// drifts. Never hand-edit.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const meta = JSON.parse(readFileSync("scripts/registry-meta.json", "utf8")).components;
const parts = [
  "# Components and their props",
  "",
  "> GENERATED from `dist/*.d.ts` and the catalog metadata by",
  "> `scripts/gen-components-doc.mjs` -- regenerate, never hand-edit.",
  "> Each block is the component's compiled declaration file, verbatim:",
  "> the props contract as TypeScript states it.",
  "",
];
let count = 0;
for (const [slug, m] of Object.entries(meta).sort(([a], [b]) => a.localeCompare(b))) {
  const dts = `dist/components/${slug}.d.ts`;
  if (!existsSync(dts)) continue;
  count += 1;
  parts.push(`## ${m.title} (\`${slug}\`)`, "", m.description, "", "```ts",
    readFileSync(dts, "utf8").trimEnd(), "```", "");
}
writeFileSync("docs/components.md", parts.join("\n") + "\n");
console.log(`components doc: ${count} entries -> docs/components.md`);
