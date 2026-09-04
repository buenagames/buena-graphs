// Renders one component through the compiled dist and compares the text
// twin against the published catalog's [ STATUS ] block, verbatim.
// dist is built for bundler resolution (the site's Vite build); tsx
// resolves it here so the smoke test exercises what actually ships.
import { GraphUptime, graphToText } from "../dist/index.js";

const days = [
  ...Array<string>(16).fill("ok"),
  "degraded",
  ...Array<string>(8).fill("ok"),
  "down",
  "degraded",
  ...Array<string>(12).fill("ok"),
  "degraded",
  ...Array<string>(2).fill("ok"),
];

const expected = [
  "[ STATUS ]",
  "",
  "████████████████▒████████·▒███",
  "█████████▒██",
  "90%               6w ago today",
  "█ up  ▒ slow  · down",
  "90 percent uptime over 42 days, 6w ago to today",
].join("\n");

const got = graphToText(GraphUptime as never, {
  title: "status",
  from: "6w ago",
  to: "today",
  days,
});

if (got === expected) {
  console.log("smoke: [ STATUS ] twin matches the catalog byte-for-byte");
} else {
  console.error("smoke: MISMATCH\n--- got ---\n" + got + "\n--- expected ---\n" + expected);
  process.exit(1);
}
