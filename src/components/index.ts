/**
 * mdx-graphs, vendored — https://mdx-graphs.kshv.me/docs
 *
 * Copied from the shadcn registry at `mdx-graphs.kshv.me/r` and flattened into
 * one folder. Three edits, all of them deliberate and all of them documented
 * where they are made:
 *
 *   1. The upstream `@/registry/default/graph-frame/*` imports point at
 *      siblings here.
 *   2. `motion/react` points at ./motion-static, which is what lets these
 *      render as plain characters with no client directive.
 *   3. DIM_OPACITY in graph-motion.ts is 1 rather than 0.4, because dimmed
 *      text cannot hold this site's 4.5:1 floor.
 *   4. graph-compare.tsx builds a per-row aria-label, the way graph-heatmap
 *      and graph-stack already do. Without one a screen reader reads the
 *      matrix as "Ligatures, check, dash, check" with nothing to say which
 *      column each mark belongs to.
 *
 * Colour reaches them entirely through Tailwind's graph-* utilities, which
 * global.css binds to the site's --g-* tokens. No component names a hue.
 *
 * All twenty-nine graphs plus the frame are here. GraphTimer and GraphCountdown
 * are the only two that read a clock: rendered with no client directive they
 * settle on the zero state their hook starts from, which is deterministic and
 * is what /graphs shows.
 */

export {
  Graph,
  GraphBody,
  GraphCorners,
  GraphRule,
  GraphTick,
  GraphTitle,
  GraphTrack,
} from "./graph-frame";
export { GraphArrow } from "./graph-arrow";
export type { Glyphs, GlyphSetName, GraphPalette } from "./graph-motion";

export { GraphActivity } from "./graph-activity";
export { GraphBars } from "./graph-bars";
export { GraphBullet } from "./graph-bullet";
export { GraphCalendar } from "./graph-calendar";
export { GraphCells } from "./graph-cells";
export { GraphCompare } from "./graph-compare";
export { GraphCountdown } from "./graph-countdown";
export { GraphDiff } from "./graph-diff";
export { GraphFlow } from "./graph-flow";
export { GraphFunnel } from "./graph-funnel";
export { GraphGantt } from "./graph-gantt";
export { GraphHeatmap } from "./graph-heatmap";
export { GraphInvoice } from "./graph-invoice";
export { GraphKpi } from "./graph-kpi";
export { GraphMeter } from "./graph-meter";
export { GraphPlot } from "./graph-plot";
export { GraphRank } from "./graph-rank";
export { GraphSlope } from "./graph-slope";
export { GraphSpark } from "./graph-spark";
export { GraphSpec } from "./graph-spec";
export { GraphStack } from "./graph-stack";
export { GraphStat } from "./graph-stat";
export { GraphTable } from "./graph-table";
export { GraphTimeline } from "./graph-timeline";
export { GraphTimer } from "./graph-timer";
export { GraphTree } from "./graph-tree";
export { GraphUptime } from "./graph-uptime";
export { GraphWaffle } from "./graph-waffle";
export { GraphWaterfall } from "./graph-waterfall";
