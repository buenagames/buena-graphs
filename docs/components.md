# Components and their props

> GENERATED from `dist/*.d.ts` and the catalog metadata by
> `scripts/gen-components-doc.mjs` -- regenerate, never hand-edit.
> Each block is the component's compiled declaration file, verbatim:
> the props contract as TypeScript states it.

## Activity (`graph-activity`)

A contribution grid. Dated counts in, weeks and intensity derived.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type ActivityDay = {
    date: string;
    count: number;
};
type GraphActivityProps = {
    title: string;
    days: ActivityDay[];
    weekStartsOn?: 0 | 1;
    max?: number;
    legend?: boolean;
    caption?: string | false;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphActivity({ title, days, weekStartsOn, max, legend, caption, glyphs, palette, corner, className, }: GraphActivityProps): import("react").JSX.Element;
export { GraphActivity };
export type { ActivityDay, GraphActivityProps };
```

## Bars (`graph-bars`)

Two series above and below a label — a before and after of the same categories, with the thing between them named.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type BarSeries = {
    label: string;
    values: number[];
    size?: "sm" | "lg";
};
type GraphBarsProps = {
    title: string;
    from: BarSeries;
    to: BarSeries;
    processor?: string;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphBars({ title, from, to, processor, glyphs, palette, corner, className, }: GraphBarsProps): import("react").JSX.Element;
export { GraphBars };
export type { BarSeries, GraphBarsProps };
```

## Bullet (`graph-bullet`)

Value against target on one track, for a number with something to beat.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type BulletItem = {
    label: string;
    value: number;
    target?: number;
    max?: number;
    display?: string;
};
type GraphBulletProps = {
    title: string;
    items: BulletItem[];
    ticks?: number;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphBullet({ title, items, ticks, glyphs, palette, corner, className, }: GraphBulletProps): import("react").JSX.Element;
export { GraphBullet };
export type { BulletItem, GraphBulletProps };
```

## Calendar (`graph-calendar`)

One month on a seven-column grid, with days marked and one picked out.

```ts
import { type GraphPalette } from "./graph-motion.js";
type CalendarMark = {
    day: number;
    accent?: boolean;
};
type GraphCalendarProps = {
    title?: string;
    year: number;
    month: number;
    weekStartsOn?: 0 | 1;
    marks?: CalendarMark[] | number[];
    today?: number;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphCalendar({ title, year, month, weekStartsOn, marks, today, palette, corner, className, }: GraphCalendarProps): import("react").JSX.Element;
export { GraphCalendar };
export type { CalendarMark, GraphCalendarProps };
```

## Cells (`graph-cells`)

Small multiples of an on-and-off grid — the same shape drawn once per group, for comparing patterns rather than magnitudes.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type CellGrid = {
    label: string;
    cells: number[][];
};
type GraphCellsProps = {
    title: string;
    items: CellGrid[];
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphCells({ title, items, glyphs, palette, corner, className, }: GraphCellsProps): import("react").JSX.Element;
export { GraphCells };
export type { CellGrid, GraphCellsProps };
```

## Compare (`graph-compare`)

A feature matrix. Booleans draw as ✓ and –; one column takes the accent.

```ts
import { type GraphPalette } from "./graph-motion.js";
type CompareCell = string | boolean;
type CompareRow = {
    label: string;
    values: CompareCell[];
};
type GraphCompareProps = {
    title: string;
    columns: string[];
    rows: CompareRow[];
    accent?: string;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphCompare({ title, columns, rows, accent, palette, corner, className, }: GraphCompareProps): import("react").JSX.Element;
export { GraphCompare };
export type { CompareCell, CompareRow, GraphCompareProps };
```

## Countdown (`graph-countdown`)

Time remaining until an instant, with a message for when it lands.

```ts
import { type GraphPalette } from "./graph-motion.js";
type GraphCountdownProps = {
    title: string;
    to: Date | number | string;
    done?: string;
    caption?: string;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphCountdown({ title, to, done, caption, palette, corner, className, }: GraphCountdownProps): import("react").JSX.Element;
export { GraphCountdown };
export type { GraphCountdownProps };
```

## Diff (`graph-diff`)

Added, removed and unchanged rows, with a total at the bottom.

```ts
import { type GraphPalette } from "./graph-motion.js";
type DiffSign = "add" | "remove" | "keep";
type DiffRow = {
    label: string;
    value: string;
    sign?: DiffSign;
};
type GraphDiffProps = {
    title: string;
    rows: DiffRow[];
    footer?: DiffRow;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphDiff({ title, rows, footer, palette, corner, className, }: GraphDiffProps): import("react").JSX.Element;
export { GraphDiff };
export type { DiffRow, DiffSign, GraphDiffProps };
```

## Flow (`graph-flow`)

Nodes on dashed arrows. Rows read left to right; one path can be accented.

```ts
import { type GraphPalette } from "./graph-motion.js";
type FlowTone = "default" | "accent" | "muted";
type FlowNode = {
    label: string;
    tone?: FlowTone;
    stretch?: boolean;
};
type FlowRow = {
    nodes: FlowNode[];
};
type GraphFlowProps = {
    title: string;
    rows: FlowRow[];
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphFlow({ title, rows, palette, corner, className, }: GraphFlowProps): import("react").JSX.Element;
export { GraphFlow };
export type { FlowNode, FlowRow, GraphFlowProps };
```

## Frame (`graph-frame`)

Not a graph — the dashed figure the other twenty-nine are drawn inside. Compose it with GraphBody, GraphTitle, GraphRule, GraphTrack and GraphTick to draw one of your own.

```ts
import * as React from "react";
declare function GraphCorners({ mark }: {
    mark?: string;
}): React.JSX.Element;
declare function GraphTitle({ className, children, ...props }: React.ComponentProps<"figcaption">): React.JSX.Element;
declare function GraphBody({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function GraphRule({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function GraphTrack({ className, ...props }: React.ComponentProps<"span">): React.JSX.Element;
declare function GraphTick({ className, ...props }: React.ComponentProps<"span">): React.JSX.Element;
declare function Graph({ title, corner, className, children, ...props }: React.ComponentProps<"figure"> & {
    title?: string;
    corner?: string;
}): React.JSX.Element;
export { Graph, GraphBody, GraphCorners, GraphRule, GraphTick, GraphTitle, GraphTrack, };
```

## Funnel (`graph-funnel`)

Steps that only ever narrow, with the drop shown at each one.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type FunnelStep = {
    label: string;
    value: number;
    display?: string;
};
type GraphFunnelProps = {
    title: string;
    steps: FunnelStep[];
    ticks?: number;
    stage?: string;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphFunnel({ title, steps, ticks, stage, glyphs, palette, corner, className, }: GraphFunnelProps): import("react").JSX.Element;
export { GraphFunnel };
export type { FunnelStep, GraphFunnelProps };
```

## Gantt (`graph-gantt`)

Bars on a shared track, measured from day counts rather than drawn.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type GanttItem = {
    label: string;
    start: number;
    end: number;
    accent?: boolean;
    complete?: number;
};
type GraphGanttProps = {
    title: string;
    items: GanttItem[];
    ticks?: string[];
    columns?: number;
    stage?: string;
    progress?: number;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphGantt({ title, items, ticks, columns, stage, progress, glyphs, palette, corner, className, }: GraphGanttProps): import("react").JSX.Element;
export { GraphGantt };
export type { GanttItem, GraphGanttProps };
```

## Heatmap (`graph-heatmap`)

A punchcard: labelled rows against labelled columns, intensity by glyph.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type HeatRow = {
    label: string;
    values: number[];
};
type GraphHeatmapProps = {
    title: string;
    columns: string[];
    rows: HeatRow[];
    max?: number;
    legend?: boolean;
    caption?: string;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphHeatmap({ title, columns, rows, max, legend, caption, glyphs, palette, corner, className, }: GraphHeatmapProps): import("react").JSX.Element;
export { GraphHeatmap };
export type { GraphHeatmapProps, HeatRow };
```

## Invoice (`graph-invoice`)

A document rather than a chart — the frame doing receipts and statements.

```ts
type InvoiceParty = {
    name: string;
    lines?: string[];
};
type InvoiceMeta = {
    label: string;
    value: string;
};
type InvoiceItem = {
    description: string;
    qty?: string;
    rate?: string;
    amount: string;
};
type InvoiceTotal = {
    label: string;
    value: string;
    accent?: boolean;
};
type GraphInvoiceProps = {
    title: string;
    from?: InvoiceParty;
    to?: InvoiceParty;
    meta?: InvoiceMeta[];
    items: InvoiceItem[];
    totals?: InvoiceTotal[];
    note?: string;
    corner?: string;
    className?: string;
};
declare function GraphInvoice({ title, from, to, meta, items, totals, note, corner, className, }: GraphInvoiceProps): import("react").JSX.Element;
export { GraphInvoice };
export type { GraphInvoiceProps, InvoiceItem, InvoiceMeta, InvoiceParty, InvoiceTotal, };
```

## KPI (`graph-kpi`)

One number with its trend under it — a headline that shows its working.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type GraphKpiProps = {
    title: string;
    value: string;
    label: string;
    hint?: string;
    data: number[];
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphKpi({ title, value, label, hint, data, glyphs, palette, corner, className, }: GraphKpiProps): import("react").JSX.Element;
export { GraphKpi };
export type { GraphKpiProps };
```

## Meter (`graph-meter`)

A single value on a track — the smallest chart that is still a chart.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type GraphMeterProps = {
    title: string;
    value: number;
    ticks?: number;
    caption?: string;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphMeter({ title, value, ticks, caption, glyphs, palette, corner, className, }: GraphMeterProps): import("react").JSX.Element;
export { GraphMeter };
export type { GraphMeterProps };
```

## Plot (`graph-plot`)

A line or area plot with a y-scale, for when the magnitude matters.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type GraphPlotProps = {
    title: string;
    data: number[];
    labels?: string[];
    height?: number;
    variant?: "line" | "area";
    progress?: number;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphPlot({ title, data, labels, height, variant, progress, glyphs, palette, corner, className, }: GraphPlotProps): import("react").JSX.Element;
export { GraphPlot };
export type { GraphPlotProps };
```

## Rank (`graph-rank`)

An ordered bar list — the shape you want for a top-n.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type RankItem = {
    label: string;
    value: number;
    display?: string;
};
type GraphRankProps = {
    title: string;
    items: RankItem[];
    max?: number;
    ticks?: number;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphRank({ title, items, max, ticks, glyphs, palette, corner, className, }: GraphRankProps): import("react").JSX.Element;
export { GraphRank };
export type { GraphRankProps, RankItem };
```

## Slope (`graph-slope`)

Two columns and the lines between them — what moved, and which way.

```ts
import { type GraphPalette } from "./graph-motion.js";
type SlopeItem = {
    label: string;
    from: number;
    to: number;
};
type GraphSlopeProps = {
    title: string;
    fromLabel: string;
    toLabel: string;
    items: SlopeItem[];
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphSlope({ title, fromLabel, toLabel, items, palette, corner, className, }: GraphSlopeProps): import("react").JSX.Element;
export { GraphSlope };
export type { GraphSlopeProps, SlopeItem };
```

## Spark (`graph-spark`)

A sparkline in block glyphs, scaled to its own highest point.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type GraphSparkProps = {
    title: string;
    data: number[];
    caption?: string;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphSpark({ title, data, caption, glyphs, palette, corner, className, }: GraphSparkProps): import("react").JSX.Element;
export { GraphSpark };
export type { GraphSparkProps };
```

## Spec (`graph-spec`)

A definition list — labels down the left, values right, one accented.

```ts
type SpecRow = {
    label: string;
    value: string;
    accent?: boolean;
};
type GraphSpecProps = {
    title: string;
    rows: SpecRow[];
    corner?: string;
    className?: string;
};
declare function GraphSpec({ title, rows, corner, className }: GraphSpecProps): import("react").JSX.Element;
export { GraphSpec };
export type { GraphSpecProps, SpecRow };
```

## Stack (`graph-stack`)

Parts of a whole, one row per group. The palette that earns three hues.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type StackSegment = {
    label: string;
    value: number;
};
type StackRow = {
    label: string;
    segments: StackSegment[];
};
type GraphStackProps = {
    title: string;
    rows: StackRow[];
    accent?: string;
    ticks?: number;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphStack({ title, rows, accent, ticks, glyphs, palette, corner, className, }: GraphStackProps): import("react").JSX.Element;
export { GraphStack };
export type { GraphStackProps, StackRow, StackSegment };
```

## Stat (`graph-stat`)

A row of headline figures, each with a label and an optional hint.

```ts
type StatItem = {
    value: string;
    label: string;
    hint?: string;
    accent?: boolean;
};
type GraphStatProps = {
    title: string;
    items: StatItem[];
    corner?: string;
    className?: string;
};
declare function GraphStat({ title, items, corner, className }: GraphStatProps): import("react").JSX.Element;
export { GraphStat };
export type { GraphStatProps, StatItem };
```

## Table (`graph-table`)

A plain table inside the frame, with per-column alignment and a footer.

```ts
import type { ReactNode } from "react";
type GraphAlign = "left" | "right";
type GraphTableProps = {
    title: string;
    headers: string[];
    rows: ReactNode[][];
    footer?: ReactNode[];
    align?: GraphAlign[];
    corner?: string;
    className?: string;
};
declare function GraphTable({ title, headers, rows, footer, align, corner, className, }: GraphTableProps): import("react").JSX.Element;
export { GraphTable };
export type { GraphTableProps };
```

## Timeline (`graph-timeline`)

Dated events down a connector, with done, current and upcoming states.

```ts
import { type GraphPalette } from "./graph-motion.js";
type TimelineState = "done" | "now" | "next";
type TimelineEvent = {
    date: string;
    label: string;
    state?: TimelineState;
};
type GraphTimelineProps = {
    title: string;
    events: TimelineEvent[];
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphTimeline({ title, events, palette, corner, className, }: GraphTimelineProps): import("react").JSX.Element;
export { GraphTimeline };
export type { GraphTimelineProps, TimelineEvent, TimelineState };
```

## Timer (`graph-timer`)

Elapsed time, time since, or a wall clock.

```ts
import { type GraphPalette } from "./graph-motion.js";
type TimerKind = "elapsed" | "ago" | "clock";
type GraphTimerProps = {
    title: string;
    kind?: TimerKind;
    at?: Date | number | string;
    caption?: string;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphTimer({ title, kind, at, caption, palette, corner, className, }: GraphTimerProps): import("react").JSX.Element;
export { GraphTimer };
export type { GraphTimerProps, TimerKind };
```

## Tree (`graph-tree`)

A hierarchy in branch glyphs, with one node carrying the accent.

```ts
type TreeNode = {
    label: string;
    meta?: string;
    accent?: boolean;
    children?: TreeNode[];
};
type GraphTreeProps = {
    title: string;
    nodes: TreeNode[];
    corner?: string;
    className?: string;
};
declare function GraphTree({ title, nodes, corner, className }: GraphTreeProps): import("react").JSX.Element;
export { GraphTree };
export type { GraphTreeProps, TreeNode };
```

## Uptime (`graph-uptime`)

A status strip — one cell a day, three states and a gap.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type UptimeStatus = "ok" | "degraded" | "down" | "empty";
type GraphUptimeProps = {
    title: string;
    days: UptimeStatus[];
    from?: string;
    to?: string;
    columns?: number;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphUptime({ title, days, from, to, columns, glyphs, palette, corner, className, }: GraphUptimeProps): import("react").JSX.Element;
export { GraphUptime };
export type { GraphUptimeProps, UptimeStatus };
```

## Waffle (`graph-waffle`)

A percentage as a block of cells, when a bar would not show the remainder.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type GraphWaffleProps = {
    title: string;
    value: number;
    cells?: number;
    columns?: number;
    caption?: string;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphWaffle({ title, value, cells, columns, caption, glyphs, palette, corner, className, }: GraphWaffleProps): import("react").JSX.Element;
export { GraphWaffle };
export type { GraphWaffleProps };
```

## Waterfall (`graph-waterfall`)

How a total was arrived at — a start, the moves, and where it landed.

```ts
import { type Glyphs, type GraphPalette } from "./graph-motion.js";
type WaterfallKind = "start" | "in" | "out" | "end";
type WaterfallItem = {
    label: string;
    value: number;
    display?: string;
    kind?: WaterfallKind;
};
type GraphWaterfallProps = {
    title: string;
    items: WaterfallItem[];
    ticks?: number;
    glyphs?: Glyphs;
    palette?: GraphPalette;
    corner?: string;
    className?: string;
};
declare function GraphWaterfall({ title, items, ticks, glyphs, palette, corner, className, }: GraphWaterfallProps): import("react").JSX.Element;
export { GraphWaterfall };
export type { GraphWaterfallProps, WaterfallItem, WaterfallKind };
```

