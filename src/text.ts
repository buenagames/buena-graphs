/**
 * Re-lays out a rendered graph as padded monospace text.
 *
 * `/graphs` has a markdown twin, and for most pages that translation loses
 * something — layout, type, colour. Graphs made of characters are the one
 * place it does not have to: the fenced block can be the same drawing a reader
 * sees. But only a handful of the thirty survive `textContent` plus a fence.
 * `Spark`, `Uptime`, `Waffle` and the other literal glyph runs do, because
 * their character stream *is* the drawing. The rest line their columns up with
 * `grid-template-columns` and flex, and their text stream comes out with no
 * spaces at all — the compare matrix reads
 * `[features]++++JetBrainsiAWriterFiraCode…`, which is not a table.
 *
 * So the alignment has to be rebuilt, and the honest way to rebuild it is to
 * do the job the browser is doing: lay the rendered DOM out. That is what this
 * module is — a very small box-layout engine that composes onto a character
 * canvas instead of a pixel one.
 *
 * The alternative was a second text renderer per shape, reusing the library's
 * glyph helpers. It would be independent of markup, but it would be a second
 * implementation of thirty components, and two implementations drift. This one
 * has a single source of truth — the components themselves — and depends only
 * on generic layout utilities (`flex`, `flex-col`, `grid`, `grid-cols-*`,
 * `text-right`, `items-end`), not on any component's own class names. What it
 * cannot defend against on its own is a re-vendor that changes those
 * primitives, so `tests/graph-text.test.ts` asserts that the glyph run in the
 * fence is the glyph run in the DOM, and fails loudly if the two ever diverge.
 */
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parse, NodeType, type HTMLElement, type Node } from "node-html-parser";


/* ------------------------------------------------------------------ *
 * A character canvas
 * ------------------------------------------------------------------ */

/**
 * A rectangular block of characters, as an array of lines.
 *
 * `ghost` marks a box that paints but does not take up room — the text
 * equivalent of `position: absolute`. The contribution grid's month labels are
 * absolutely positioned inside one-character cells, so a "Mar" that advanced
 * the cursor by three would shear every row below it out of alignment; as a
 * ghost it writes across the empty cells that follow, which is what the
 * browser draws.
 */
interface Box {
  lines: string[];
  /**
   * Room the box reserves, which is not always the width of its own text. A
   * `w-[4ch]` calendar cell holding nothing still owns four columns, and the
   * empty cells that pad a contribution grid's header own one each — drop
   * them and every row below shears left.
   */
  width: number;
  ghost?: boolean;
  /**
   * Re-lays the box into a wider slot. `justify-between` and `flex-1` both
   * mean "use the room you are given", and the room is only known once a
   * sibling has been measured — the gantt's month axis is as wide as the bars
   * above it, and nothing about the axis itself says so. A box that can spread
   * says how; everything else is simply padded.
   */
  stretch?: (target: number) => Box;
}

/** Counts characters rather than code units. Everything here is single-width. */
const width = (line: string) => [...line].length;
const EMPTY: Box = { lines: [], width: 0 };

type Align = "left" | "right" | "center";
type VAlign = "top" | "middle" | "bottom";

function pad(line: string, to: number, align: Align): string {
  const slack = to - width(line);
  if (slack <= 0) return line;
  if (align === "right") return " ".repeat(slack) + line;
  if (align === "center") {
    const left = Math.floor(slack / 2);
    return " ".repeat(left) + line + " ".repeat(slack - left);
  }
  return line + " ".repeat(slack);
}

/**
 * Writes one box into another at (row, col), growing the canvas to fit.
 *
 * Blitting rather than concatenating is what makes overflow work: a ghost box
 * writes past the width its parent reserved for it, over whatever blank cells
 * follow, exactly as an absolutely positioned label does.
 */
function blit(canvas: string[][], box: Box, row: number, col: number) {
  box.lines.forEach((line, y) => {
    const target = row + y;
    while (canvas.length <= target) canvas.push([]);
    const chars = [...line];
    const into = canvas[target]!;
    chars.forEach((char, x) => {
      const at = col + x;
      while (into.length < at) into.push(" ");
      // A space never erases a glyph already written there — two ghosts can
      // share a row, and their padding must not rub each other out.
      if (char !== " " || into[at] === undefined) into[at] = char;
    });
  });
}

function harden(canvas: string[][], reserved = 0): Box {
  const lines = canvas.map((row) => row.join("").replace(/\s+$/, ""));
  return { lines, width: Math.max(reserved, ...lines.map(width), 0) };
}

/**
 * Stacks boxes top to bottom, `gap` blank lines between them.
 *
 * The column's width settles first, then anything in it that can spread is
 * asked to spread to that width — which is how a month axis ends up as wide as
 * the bars it sits under.
 */
function stack(boxes: Box[], gap: number, tall = 0, spread = false): Box {
  const target = boxes.reduce((w, box) => Math.max(w, box.width), 0);
  const laid = boxes.map((box) => (box.stretch && box.width < target ? box.stretch(target) : box));
  const solid = laid.filter((box) => box.lines.length > 0);

  // A column with a declared height and a spreading justification pushes its
  // children apart down that height — the plot's y-axis puts its high mark on
  // the first line and its zero on the last, seven lines down.
  const natural = solid.reduce((h, box) => h + box.lines.length, 0) + gap * Math.max(0, solid.length - 1);
  const extra = spread && tall > natural ? share(tall - natural, Math.max(1, solid.length - 1)) : [];

  const canvas: string[][] = [];
  let row = 0;
  solid.forEach((box, i) => {
    blit(canvas, box, row, 0);
    row += box.lines.length + gap + (extra[i] ?? 0);
  });
  while (canvas.length < tall) canvas.push([]);
  return harden(canvas, target);
}

/**
 * Places boxes side by side, `gap` spaces between them.
 *
 * A box with no lines but a reserved width still advances the cursor — that is
 * what keeps an empty cell an empty cell rather than nothing at all.
 */
function beside(boxes: Box[], gap: number | number[], align: VAlign): Box {
  const solid = boxes.filter((box) => box.lines.length > 0 || box.width > 0);
  if (solid.length === 0) return EMPTY;
  const gapAt = (i: number) => (Array.isArray(gap) ? (gap[i] ?? 0) : gap);
  const height = Math.max(...solid.map((box) => box.lines.length));
  const canvas: string[][] = [];
  let col = 0;
  let i = -1;
  for (const box of solid) {
    i++;
    const offset =
      align === "bottom"
        ? height - box.lines.length
        : align === "middle"
          ? Math.floor((height - box.lines.length) / 2)
          : 0;
    blit(canvas, box, offset, col);
    if (!box.ghost) col += box.width + gapAt(i);
  }
  return harden(canvas, col > 0 ? col - gapAt(i) : 0);
}

/** Splits `total` over `slots` as evenly as it goes, remainder to the left. */
function share(total: number, slots: number): number[] {
  if (slots <= 0) return [];
  const base = Math.floor(total / slots);
  const extra = total - base * slots;
  return Array.from({ length: slots }, (_, i) => base + (i < extra ? 1 : 0));
}

/* ------------------------------------------------------------------ *
 * Reading the layout back off the markup
 * ------------------------------------------------------------------ */

/**
 * The utility classes on an element, with the `sm:` prefix dropped.
 *
 * The catalogue renders wide, so the small-screen variant is the one a reader
 * actually sees — `sm:grid-cols-4` is four columns, not one.
 */
function classesOf(el: HTMLElement): Set<string> {
  const raw = el.getAttribute("class") ?? "";
  return new Set(raw.split(/\s+/).filter(Boolean).map((c) => c.replace(/^sm:/, "")));
}

const has = (cls: Set<string>, name: string) => cls.has(name);

/** Tailwind's gap scale, in characters. Sub-unit gaps close up entirely: a
 *  sparkline's cells are `gap-0.5` apart and must read as one run of glyphs. */
function gapChars(cls: Set<string>, axis: "x" | "y"): number {
  let found: number | null = null;
  for (const name of cls) {
    const m = name.match(/^gap(?:-([xy]))?-(\d+(?:\.\d+)?)$/);
    if (!m) continue;
    if (m[1] && m[1] !== axis) continue;
    const value = Number(m[2]);
    found = found === null ? value : Math.min(found, value);
  }
  if (found === null) return 0;
  if (axis === "y") return found >= 6 ? 1 : 0;
  // Sub-unit gaps close up entirely — a sparkline's cells are `gap-0.5` apart
  // and have to read as one run of glyphs. Everything wider is a separation
  // between things, and needs at least a column to read as one.
  if (found <= 0.5) return 0;
  return found >= 4 ? 2 : 1;
}

/** Splits a grid template on top-level whitespace, expanding `repeat(n, …)`. */
function countTemplate(template: string): number {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const char of template) {
    if (char === "(") depth++;
    if (char === ")") depth--;
    if (/\s/.test(char) && depth === 0) {
      if (current) parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  if (current) parts.push(current);

  let total = 0;
  for (const part of parts) {
    const repeat = part.match(/^repeat\((\d+)\s*,/);
    total += repeat ? Number(repeat[1]) : 1;
  }
  return total;
}

/** How many columns a grid has, and the key rows share when they line up. */
function gridSpec(el: HTMLElement, cls: Set<string>): { columns: number; key: string } | null {
  if (!has(cls, "grid")) return null;

  const inline = (el.getAttribute("style") ?? "").match(/grid-template-columns:\s*([^;]+)/);
  if (inline) return { columns: countTemplate(inline[1]!), key: inline[1]!.trim() };

  for (const name of cls) {
    const bracket = name.match(/^grid-cols-\[(.+)\]$/);
    if (bracket) {
      return { columns: countTemplate(bracket[1]!.replace(/_/g, " ")), key: bracket[1]! };
    }
    const numeric = name.match(/^grid-cols-(\d+)$/);
    if (numeric) return { columns: Number(numeric[1]), key: name };
  }
  // A grid with no template is one column per child — Tailwind's default.
  return { columns: Number.POSITIVE_INFINITY, key: "auto" };
}

/**
 * The width an element is pinned to, in characters.
 *
 * `w-[4ch]`, `min-w-[1ch]` and friends are the components saying outright how
 * many cells something occupies — the one place the markup states a measure in
 * the same unit this renderer works in, so it is taken literally.
 */
/**
 * The height an element is pinned to, in lines.
 *
 * `Plot` is the only component that sets one, as `height:7em` — and it is the
 * only one that needs it, because its bars are a column of cells whose blank
 * top half is what gives the plot its shape. Read in `em`, one line each.
 */
function heightFloor(el: HTMLElement): number {
  const m = (el.getAttribute("style") ?? "").match(/height:\s*([\d.]+)em/);
  return m ? Math.round(Number(m[1])) : 0;
}

function widthFloor(cls: Set<string>): number {
  let floor = 0;
  for (const name of cls) {
    const m = name.match(/^(?:min-)?w-\[(\d+(?:\.\d+)?)ch\]$/);
    if (m) floor = Math.max(floor, Math.round(Number(m[1])));
  }
  return floor;
}

const alignOf = (cls: Set<string>): Align =>
  has(cls, "text-right") ? "right" : has(cls, "text-center") ? "center" : "left";

const vAlignOf = (cls: Set<string>): VAlign =>
  has(cls, "items-end") ? "bottom" : has(cls, "items-center") ? "middle" : "top";

const isRow = (cls: Set<string>) =>
  (has(cls, "flex") || has(cls, "inline-flex")) && !has(cls, "flex-col");

/**
 * Tags that flow their children left to right rather than stacking them.
 *
 * The tree's branch glyph and its label are two plain `<span>`s inside a
 * third — no flex anywhere, because inline elements already do the right
 * thing. Stacking them would put `├─` on its own line above the file name.
 */
const INLINE = new Set([
  "SPAN", "A", "CODE", "EM", "STRONG", "B", "I", "SMALL",
  "ABBR", "TIME", "SUP", "SUB", "LABEL", "MARK", "S", "U", "DFN", "VAR", "KBD",
]);

const isInline = (node: HTMLElement, cls: Set<string>) =>
  INLINE.has(node.tagName ?? "") &&
  !has(cls, "block") &&
  !has(cls, "grid") &&
  !has(cls, "flex") &&
  !has(cls, "inline-flex");

const canGrow = (cls: Set<string>) =>
  has(cls, "flex-1") || has(cls, "flex-auto") || has(cls, "grow");

function transform(text: string, cls: Set<string>): string {
  if (has(cls, "uppercase")) return text.toUpperCase();
  if (has(cls, "lowercase")) return text.toLowerCase();
  return text;
}

/* ------------------------------------------------------------------ *
 * Laying a figure out
 * ------------------------------------------------------------------ */

/**
 * Column widths, keyed by grid template.
 *
 * The compare matrix's header is a `div` and its rows are `li`s inside a `ul`,
 * so the cells that must line up are not siblings and cannot be measured from
 * one parent. They do share a template string, which is exactly the thing the
 * browser lines them up by, so that is the key: measure every grid in the
 * figure in one pass, then paint with the widest cell per column.
 */
type Widths = Map<string, number[]>;

/** One key per <table> in the figure, so its rows share a set of columns. */
let tableKeys = new Map<HTMLElement, string>();

function element(node: Node): node is HTMLElement {
  return node.nodeType === NodeType.ELEMENT_NODE;
}

/** The four `+` marks are the only `pointer-events-none` nodes a graph has. */
const isCorner = (cls: Set<string>) => has(cls, "pointer-events-none");

function layout(node: Node, widths: Widths, measuring: boolean): Box {
  if (node.nodeType === NodeType.TEXT_NODE) {
    const text = node.text;
    return text.length === 0 ? EMPTY : { lines: [text], width: width(text) };
  }
  if (!element(node)) return EMPTY;

  const cls = classesOf(node);
  if (isCorner(cls)) return EMPTY;

  const kids = node.childNodes.filter(
    (child) => child.nodeType === NodeType.TEXT_NODE || element(child),
  );

  // `Invoice` is the one component that reaches for a real <table>, and its
  // columns line up for the same reason a grid's do — every row shares them.
  // So a <tr> is a grid row whose key is the table it belongs to.
  if (node.tagName === "TR") {
    const table = node.closest("table");
    const key = (table && tableKeys.get(table)) ?? "table";
    return gridRows(kids, widths, measuring, key, Number.POSITIVE_INFINITY, 2, 0, "top");
  }

  const grid = gridSpec(node, cls);
  if (grid) {
    return gridRows(
      kids,
      widths,
      measuring,
      grid.key,
      grid.columns,
      gapChars(cls, "x"),
      gapChars(cls, "y"),
      vAlignOf(cls),
    );
  }

  const parts = kids.map((child) => ({
    box: layout(child, widths, measuring),
    grow: element(child) && canGrow(classesOf(child)),
  }));
  const boxes = parts.map((part) => part.box);

  const inline = isInline(node, cls);
  const row = isRow(cls) || inline;
  const gap = row ? (inline ? 0 : gapChars(cls, "x")) : gapChars(cls, "y");
  const vAlign = vAlignOf(cls);

  const tall = heightFloor(node);
  let composed = row
    ? beside(boxes, gap, vAlign)
    : stack(boxes, gap, tall, has(cls, "justify-between") || has(cls, "justify-end"));

  if (row) {
    // A row of one-character flexible cells is a drawing, not a layout. Its
    // cells do grow in CSS, but each still paints a single glyph in the middle
    // of a wider box, so the run a reader sees stays contiguous — widening
    // them here would punch holes through the middle of a plot.
    const flexible = parts.filter((part) => part.grow);
    const growable = flexible.every((part) => part.box.width <= 1) ? 0 : flexible.length;
    const between = has(cls, "justify-between") && boxes.length > 1;
    if (growable > 0 || between) {
      const natural = composed.width;
      const laid = composed;
      composed = {
        ...laid,
        stretch: (target: number) => {
          const slack = target - natural;
          if (slack <= 0) return laid;
          if (growable > 0) {
            // Flexible children absorb the slack; fixed ones keep their size.
            const extra = share(slack, growable);
            let n = 0;
            const widened = parts.map(({ box, grow }) => {
              if (!grow) return box;
              const to = box.width + (extra[n++] ?? 0);
              if (box.stretch) return box.stretch(to);
              return { ...box, lines: box.lines.map((l) => pad(l, to, "left" as Align)), width: to };
            });
            return { ...beside(widened, gap, vAlign), width: target };
          }
          // justify-between spreads the slack into the gaps instead.
          const gaps = share(slack, boxes.length - 1).map((g) => gap + g);
          return { ...beside(boxes, gaps, vAlign), width: target };
        },
      };
    }
  }

  const cased: Box = has(cls, "uppercase") || has(cls, "lowercase")
    ? { ...composed, lines: composed.lines.map((line) => transform(line, cls)) }
    : composed;

  const hidden: Box = has(cls, "invisible")
    ? { ...cased, lines: cased.lines.map(() => ""), stretch: undefined }
    : cased;

  const floor = widthFloor(cls);
  const align = alignOf(cls);
  const shaped: Box =
    floor > hidden.width
      ? { ...hidden, lines: hidden.lines.map((line) => pad(line, floor, align)), width: floor }
      : hidden;

  // An absolutely positioned node paints where it sits and reserves nothing.
  return has(cls, "absolute") ? { ...shaped, ghost: true, width: 0 } : shaped;
}

/** Lays out cells into rows whose columns are shared with every row on `key`. */
function gridRows(
  kids: Node[],
  widths: Widths,
  measuring: boolean,
  key: string,
  declared: number,
  gap: number,
  gapY: number,
  vAlign: VAlign,
): Box {
const cells = kids.filter(element).map((cell) => {
    const box = layout(cell, widths, measuring);
    return { box, align: alignOf(classesOf(cell)) };
  });
  const columns = Number.isFinite(declared) ? declared : cells.length || 1;
  const rows: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += columns) rows.push(cells.slice(i, i + columns));

  if (measuring) {
    const seen = widths.get(key) ?? [];
    for (const row of rows) {
      row.forEach((cell, i) => {
        seen[i] = Math.max(seen[i] ?? 0, cell.box.width);
      });
    }
    widths.set(key, seen);
  }

  // While measuring, a grid still has to lay itself out — an enclosing grid
  // is measuring *it*, and a zero-width child would size the outer columns
  // to nothing. It uses the widths it can see so far; the painting pass then
  // repeats the work with the widest cell found anywhere in the figure.
  const measured = widths.get(key) ?? [];
  const painted = rows.map((row) =>
    beside(
      row.map((cell, i) => {
        const to = measured[i] ?? cell.box.width;
        if (cell.box.stretch) return cell.box.stretch(to);
        return {
          lines: cell.box.lines.map((line) => pad(line, to, cell.align)),
          width: to,
        };
      }),
      gap,
      vAlign,
    ),
  );
  return stack(painted, gapY);
}

/* ------------------------------------------------------------------ *
 * The public shape
 * ------------------------------------------------------------------ */

/**
 * Draws one graph as monospace text.
 *
 * The dashed frame and its `+` corners are drawn in CSS rather than in
 * characters, and are the one thing here that has no text form worth
 * inventing: redrawing them in `+`/`-`/`|` would make the twin *look* like the
 * page while telling an agent nothing the graph does not already say. The
 * title is the opposite — `[ per week ]` is content, and it stays.
 */
export function graphToText(component: ComponentType<never>, props: object): string {
  return figureToText(renderToStaticMarkup(createElement(component, props as never)));
}

function figureToText(markup: string): string {
  const root = parse(markup);
  const figure = root.querySelector("figure") ?? root;

  const caption = figure.querySelector("figcaption");
  const title = caption ? transform(caption.text.trim(), classesOf(caption)) : "";
  caption?.remove();

  tableKeys = new Map(
    figure.querySelectorAll("table").map((table, i) => [table, `table:${i}`] as const),
  );

  const widths: Widths = new Map();
  layout(figure, widths, true);
  const body = layout(figure, widths, false);

  const lines = [...(title ? [title, ""] : []), ...body.lines];
  // Leading and trailing blank lines are the frame's padding, not content.
  while (lines.length && lines[0]!.trim() === "") lines.shift();
  while (lines.length && lines[lines.length - 1]!.trim() === "") lines.pop();
  return lines.join("\n");
}

