// Generate the shadcn registry: one self-contained r/<name>.json per
// component plus r/all.json bundling every file -- the shape upstream
// mdx-graphs serves and the shadcn CLI is proven to install.
//
// Each item bundles the transitive local imports of its component
// (graph-frame, motion-static, ...) under registry/default/<stem>/,
// with imports rewritten from this package's ESM form
// ("./graph-frame.js") to the CLI-rewritable form
// ("@/registry/default/graph-frame/graph-frame"); "../lib/utils.js"
// becomes "@/lib/utils", which every shadcn project owns already.
//
// Titles/descriptions come from scripts/registry-meta.json (generated
// from the published catalog); cssVars/css from
// scripts/registry-theme.json (from upstream, MIT, attributed there).
// Never hand-edit r/.
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "src", "components");
const out = join(process.cwd(), "r");
mkdirSync(out, { recursive: true });

const meta = JSON.parse(readFileSync("scripts/registry-meta.json", "utf8")).components;
const theme = JSON.parse(readFileSync("scripts/registry-theme.json", "utf8"));

const files = readdirSync(src).filter((f) => /\.(tsx|ts)$/.test(f) && f !== "index.ts");
const stem = (f) => f.replace(/\.(tsx|ts)$/, "");

const localImports = (content) =>
  [...content.matchAll(/from "\.\/([a-z-]+)\.js"/g)].map((m) => m[1]);

const rewrite = (content) =>
  content
    .replace(/from "\.\.\/lib\/utils\.js"/g, 'from "@/lib/utils"')
    .replace(/from "\.\/([a-z-]+)\.js"/g, 'from "@/registry/default/$1/$1"');

const fileType = (f) =>
  f === "graph-frame.tsx" ? "registry:ui" : f.endsWith(".ts") ? "registry:lib" : "registry:component";

const registryFile = (f) => ({
  path: `registry/default/${stem(f)}/${f}`,
  content: rewrite(readFileSync(join(src, f), "utf8")),
  type: fileType(f),
});

// Transitive closure of local imports, component file last like upstream.
const closure = (f) => {
  const seen = new Set();
  const walk = (name) => {
    const file = files.find((x) => stem(x) === name);
    if (!file || seen.has(file)) return;
    seen.add(file);
    for (const dep of localImports(readFileSync(join(src, file), "utf8"))) walk(dep);
  };
  for (const dep of localImports(readFileSync(join(src, f), "utf8"))) walk(dep);
  return [...seen, f];
};

const items = [];
for (const f of files) {
  const name = stem(f);
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    title: meta[name]?.title ?? name,
    description: meta[name]?.description ?? "",
    dependencies: [],
    files: closure(f).map(registryFile),
    cssVars: theme.cssVars,
    css: theme.css,
    type: "registry:component",
  };
  writeFileSync(join(out, `${name}.json`), JSON.stringify(item, null, 2) + "\n");
  items.push(name);
}

// all.json: one item carrying every file, the way upstream serves it.
writeFileSync(
  join(out, "all.json"),
  JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "all",
      title: "buena-graphs",
      description: "Every graph component, in one install.",
      dependencies: [],
      files: files.map(registryFile),
      cssVars: theme.cssVars,
      css: theme.css,
      type: "registry:component",
    },
    null, 2,
  ) + "\n",
);
console.log(`registry: ${items.length} items + all.json -> r/`);
