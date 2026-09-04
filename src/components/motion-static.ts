/**
 * A static stand-in for `motion/react`, so the vendored mdx-graphs components
 * render as characters and nothing else.
 *
 * Upstream every graph animates: rows stagger in on `whileInView`, glyphs fade
 * up from `initial={{ opacity: 0 }}`. That is a runtime behaviour, and these
 * graphs have no runtime — they are rendered at build time through the React
 * integration with no client directive, so no hydration ever arrives to raise
 * the opacity motion wrote into the markup. Shipping the real library would
 * mean shipping the animation runtime with it, on a page whose whole argument
 * is that a chart can be text.
 *
 * So the graphs take the path the library already has for a reader who does not
 * want motion. `useReducedMotion()` answers true, and every component's own
 * reduced-motion branch resolves its variants to the finished state, skips the
 * `initial` frame, and sets the transitions to zero. `motion.<tag>` is then just
 * `<tag>` with the animation props dropped — `style` and `className` pass
 * through, because two of the components carry real dimming in `style`.
 *
 * Keeping the shim here rather than editing the components means a re-vendor
 * from the registry is a copy plus two import rewrites, not a re-application of
 * hand edits.
 */

import * as React from "react";

/** Structural stubs for the two types graph-motion.ts imports for its helpers. */
export type Transition = Record<string, unknown>;
export type Variants = Record<string, Record<string, unknown>>;

/**
 * Props that only mean something to the animation runtime. Everything else —
 * className, style, role, aria-*, key, children — is forwarded to the DOM.
 */
const MOTION_PROPS = new Set([
  "animate",
  "custom",
  "drag",
  "exit",
  "initial",
  "layout",
  "layoutId",
  "onAnimationComplete",
  "onAnimationStart",
  "transition",
  "variants",
  "viewport",
  "whileDrag",
  "whileFocus",
  "whileHover",
  "whileInView",
  "whileTap",
]);

function strip(props: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const key in props) {
    if (!MOTION_PROPS.has(key)) out[key] = props[key];
  }
  return out;
}

type MotionTags = {
  [K in keyof React.JSX.IntrinsicElements]: React.FC<
    React.JSX.IntrinsicElements[K] & Record<string, unknown>
  >;
};

/**
 * `motion.div`, `motion.li`, … resolved on demand. A Proxy rather than a fixed
 * map so a component vendored later cannot reach for a tag the shim forgot.
 */
export const motion = new Proxy({} as MotionTags, {
  get(cache: Record<string, unknown>, tag: string) {
    if (!cache[tag]) {
      const Component = (props: Record<string, unknown>) =>
        React.createElement(tag, strip(props));
      Component.displayName = `motion.${tag}`;
      cache[tag] = Component;
    }
    return cache[tag];
  },
}) as MotionTags;

/**
 * Always true. Not a claim about the reader's `prefers-reduced-motion` — it is
 * the honest answer for a page that ships no animation runtime at all.
 */
export function useReducedMotion(): boolean {
  return true;
}
