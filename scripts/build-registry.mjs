// Generate the shadcn-style registry: one r/<name>.json per component
// plus r/all.json. Generated from src/components at build time -- never
// hand-edit r/. Validate against the shadcn registry-item schema before
// launch (Phase D); the shape here follows mdx-graphs' registry.
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "src", "components");
const out = join(process.cwd(), "r");
mkdirSync(out, { recursive: true });

const files = readdirSync(src).filter((f) => /\.(tsx|ts)$/.test(f) && f !== "index.ts");
const items = [];
for (const f of files) {
  const name = f.replace(/\.(tsx|ts)$/, "");
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type: "registry:component",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: `components/${f}`,
        type: "registry:component",
        content: readFileSync(join(src, f), "utf8"),
      },
    ],
  };
  writeFileSync(join(out, `${name}.json`), JSON.stringify(item, null, 2) + "\n");
  items.push(item);
}
writeFileSync(
  join(out, "all.json"),
  JSON.stringify(
    { $schema: "https://ui.shadcn.com/schema/registry.json", name: "buena-graphs", items },
    null, 2,
  ) + "\n",
);
console.log(`registry: ${items.length} items -> r/`);
