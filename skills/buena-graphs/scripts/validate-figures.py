#!/usr/bin/env python3
"""Validate a markdown file's text figures against CONTRACT.md 1.0.1.

Plays the role of a contract renderer's detector: every ```text fence
is classified as recognized (catalog-true) or fallback, with the
failing clause named. Non-text fences are ignored, as the contract
requires. Exit 0 when every candidate that *looks* like a figure
(title line present) is recognized; 1 otherwise.

    scripts/validate-figures.py <file.md> [...]
"""
import re
import sys

TITLE = re.compile(r"^\[ [A-Z0-9 ,.'&/-]+ \]$")
INVENTORY = set("█▓▒░·▁▂▃▅▇─│├└●▶✓→–—−")


def classify(body: str):
    lines = body.split("\n")
    first = next((l for l in lines if l.strip()), "")
    if not TITLE.match(first):
        return None, "no contract title line"  # not a candidate at all
    idx = lines.index(first)
    if idx + 1 >= len(lines) or lines[idx + 1].strip() != "":
        return False, "line after title is not blank"
    for n, line in enumerate(lines, 1):
        for ch in line:
            if ord(ch) > 127 and ch not in INVENTORY:
                return False, f"line {n}: {ch!r} outside the inventory"
    return True, "recognized"


def main(paths):
    failed = 0
    for path in paths:
        text = open(path, encoding="utf-8").read()
        fences = re.findall(r"```(\w*)\n(.*?)```", text, re.S)
        recognized = ignored = 0
        for info, body in fences:
            if info != "text":
                ignored += 1
                continue
            ok, why = classify(body)
            title = body.split("\n")[0] or "(untitled)"
            if ok is None:
                ignored += 1
                print(f"  ignore     {path}: text fence without a title line")
            elif ok:
                recognized += 1
                print(f"  recognize  {title}")
            else:
                failed += 1
                print(f"  FALLBACK   {title} -- {why}")
        print(f"{path}: {recognized} recognized, {ignored} ignored, {failed} fallback")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
