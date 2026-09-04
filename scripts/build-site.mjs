// Assemble public/ for Cloudflare Pages: the registry at friendly
// URLs, the contract, the components doc, a minimal landing, and a
// redirect keeping /graphs.md single-owner at the specimen site.
import { cpSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";

rmSync("public", { recursive: true, force: true });
mkdirSync("public/r", { recursive: true });
cpSync("r", "public/r", { recursive: true });
cpSync("CONTRACT.md", "public/CONTRACT.md");
cpSync("docs/components.md", "public/components.md");
writeFileSync("public/_redirects", "/graphs.md https://buena-mono.buenalabs.io/graphs.md 302\n");
writeFileSync("public/index.html", readFileSync("scripts/site-index.html", "utf8"));
console.log("site: public/ assembled (r/, CONTRACT.md, components.md, _redirects, index.html)");
