// Regenerate the components table in README.md between the markers,
// from scripts/registry-meta.json (itself generated from the catalog).
// CI fails if the committed README drifts from this generator.
import { readFileSync, writeFileSync } from "node:fs";

const meta = JSON.parse(readFileSync("scripts/registry-meta.json", "utf8")).components;
const rows = Object.entries(meta)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, m]) => `| \`${slug}\` | ${m.title} | ${m.description} |`)
  .join("\n");
const table = [
  "| Registry name | Component | What it draws |",
  "|---|---|---|",
  rows,
].join("\n");

const readme = readFileSync("README.md", "utf8");
const out = readme.replace(
  /<!-- components:start -->[\s\S]*<!-- components:end -->/,
  `<!-- components:start -->\n${table}\n<!-- components:end -->`,
);
if (out === readme && !readme.includes("components:start")) {
  console.error("gen-readme-components: markers not found in README.md");
  process.exit(1);
}
writeFileSync("README.md", out);
console.log(`readme: ${Object.keys(meta).length} components in the table`);
