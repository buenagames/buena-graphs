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
} from "./graph-frame.js";
export { GraphArrow } from "./graph-arrow.js";
export type { Glyphs, GlyphSetName, GraphPalette } from "./graph-motion.js";

export { GraphActivity } from "./graph-activity.js";
export { GraphBars } from "./graph-bars.js";
export { GraphBullet } from "./graph-bullet.js";
export { GraphCalendar } from "./graph-calendar.js";
export { GraphCells } from "./graph-cells.js";
export { GraphCompare } from "./graph-compare.js";
export { GraphCountdown } from "./graph-countdown.js";
export { GraphDiff } from "./graph-diff.js";
export { GraphFlow } from "./graph-flow.js";
export { GraphFunnel } from "./graph-funnel.js";
export { GraphGantt } from "./graph-gantt.js";
export { GraphHeatmap } from "./graph-heatmap.js";
export { GraphInvoice } from "./graph-invoice.js";
export { GraphKpi } from "./graph-kpi.js";
export { GraphMeter } from "./graph-meter.js";
export { GraphPlot } from "./graph-plot.js";
export { GraphRank } from "./graph-rank.js";
export { GraphSlope } from "./graph-slope.js";
export { GraphSpark } from "./graph-spark.js";
export { GraphSpec } from "./graph-spec.js";
export { GraphStack } from "./graph-stack.js";
export { GraphStat } from "./graph-stat.js";
export { GraphTable } from "./graph-table.js";
export { GraphTimeline } from "./graph-timeline.js";
export { GraphTimer } from "./graph-timer.js";
export { GraphTree } from "./graph-tree.js";
export { GraphUptime } from "./graph-uptime.js";
export { GraphWaffle } from "./graph-waffle.js";
export { GraphWaterfall } from "./graph-waterfall.js";
