# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Pure static HTML/CSS/JS escape game. No build step, no dependencies, no package manager. Open `index.html` in a browser to play.

## Architecture

Linear puzzle chain: `index.html` → `clue1.html` → `clue2.html` → ... → `clue6.html` → `exit.html`

- `style.css` — shared design tokens and base styles for all pages. Page-specific overrides live in inline `<style>` blocks.
- Each clue page is self-contained: story text, a scene image, a puzzle widget, inline JS validation. No shared JS file.
- Puzzle state is in-memory only (`let solved = false`). `index.html` calls `localStorage.clear()` on every load — no cross-page persistence is intentional.
- `exit.html` collects all five fragments: `NODE / SIGNAL / AZEROY / BLOOD / RETURN`.

## Key patterns

**Image map scaling** (`index.html`): coords authored for natural image size (4000×3000), scaled proportionally to rendered size by JS on `load` and `resize`. Original coords stored in `data-orig-coords`.

**Puzzle unlock pattern**: inline `checkXxx()` function calls `show('ok-msg')`, hides error, sets `solved = true`, and sets `#next-link` to `display:block`.

**INTHA easter egg**: individual letters scattered nearly-invisible across pages (`user-select:text`, near-black on near-black). Full word typed on keyboard at `exit.html` triggers hidden overlay with embedded video. Rolling 5-char buffer in `keydown` listener.

## Design tokens (`style.css`)

```
--bg: #04040a       (page background)
--surface: #07070f  (widget backgrounds)
--text: #b8b8cc     (body copy)
--dim: #3e3e56      (muted / subheadings)
--accent: #6e0016   (deep red — borders, errors)
--pale: #222235     (subtle borders)
--mono: 'Courier New'
```

CRT scanline overlay: `body::after` with `repeating-linear-gradient`, `pointer-events:none`, `z-index:9000`.
