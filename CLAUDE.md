# CLAUDE.md

Guidance for Claude Code working in this repo. Read this first in a new session.

## Project

Static HTML/CSS/JS **escape game** set in YABUJIN's music universe / the
constructed world **Azeroy**. No build step, no dependencies, no package
manager. Open `index.html` in a browser to play. School assignment (Czech),
graded out of 40 — see "Grading status" below.

Run locally for testing (localhost = secure context, needed for SHA-256):
```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Companion docs

- **`STORY.md`** — narrative backbone + the **canonical authored in-game text**
  (source of truth, bottom section). The creator wrote the prose themselves.
- **`NAVRH.md`** — Czech design document (the graded "návrh", 10b): all pages,
  puzzles, graphic design proposal.

## Architecture

Linear chain: `index.html` → `clue1` → `clue2` → … → `clue6` → `exit.html`.

- `style.css` — shared design tokens + base styles. Page-specific CSS lives in
  inline `<style>` blocks.
- Each clue page is self-contained: story text, scene/widget, inline JS
  validation. Shared `sha.js` provides the `sha256()` helper.
- Per-tab progress via `sessionStorage` (keys `s1`–`s6`, `sx`). `index.html`
  calls `sessionStorage.clear()` on load → fresh game each new tab.

### Page chain, puzzle, answer

| Page   | Room      | Puzzle                                  | Answer (fragment) |
|--------|-----------|-----------------------------------------|-------------------|
| index  | field     | image-map: only bunker zone → clue1     | —                 |
| clue1  | bunker    | keypad code from wall marks             | `1616`            |
| clue2  | terminal  | `ls -a` → `.echo` → ROT13 `ABQR`        | `NODE`            |
| clue3  | archive   | acrostic, first letters of 6 sentences  | `SIGNAL`          |
| clue4  | gate      | read name in 6 borrowed alphabets       | `AZEROY`          |
| clue5  | broadcast | video (YABUJIN GARDEN), chorus lyric    | `BLOOD`           |
| clue6  | mirror    | pick 3 real GARDEN lyrics of 6 cards    | `RETURN`          |
| exit   | door      | enter all 5 fragments → epilogue        | —                 |

clue4 glyphs: `ᚨ ז ε ᚱ ᛟ υ` = A Z E R O Y (Elder Futhark, Hebrew, Greek). No
on-page key — solver must recognise the real scripts. (NOT a Caesar cipher;
that was an earlier draft.)

## Anti-cheat (`sha.js`)

Answers are **never plaintext** in source. Each page stores the SHA-256 hex
digest of its answer; player input is hashed (`await sha256(val)`) and compared.
clue6 stores `REAL_HASHES` (digests of the 3 genuine lyrics) instead of a
`real:true` flag, so View-Source can't reveal which cards are correct. To change
an answer, recompute its digest (`python3 -c "import hashlib;print(hashlib.sha256(b'X').hexdigest())"`).
Needs a secure context (https / localhost / file://) for `crypto.subtle`.

## Responsive scaling + scrolling

- Root font is fluid: `html { font-size: clamp(13px, 0.5vw + 10.5px, 19px) }` →
  every rem/em/ch scales. `.wrap` is `width: min(92vw, 60rem)` with `clamp()`
  padding. Scene blocks use `max-width:100%` to fill the responsive wrap.
- `index #field` is `max-width: min(96vw, 80rem)`; the image-map JS rescales
  click coords on `load`/`resize`, so changing its CSS size is safe.
- `scroll-behavior: smooth`. The `#easter` overlay uses `overflow-y:auto` +
  `justify-content: safe center` so its tall content stays scrollable.

## Navigation

Every non-index page has a `.nav` row: **left** = `← one step back` (previous
clue), **right** = `return to field →` (→ `index.html`, with the required
`title="Návrat na úvodní stránku"` hover). clue1's "back" is the field itself,
so it shows only the right button.

## INTHA easter egg (hidden ending)

Letters of `INTHA` are scattered nearly-invisible (`user-select:text`,
near-bg colour) across pages; typing the full word on the keyboard at
`exit.html` (rolling 5-char `keydown` buffer) opens a full-screen overlay.

Letter locations: **I** index (grass) · **N** clue1 (wall marks) · **T** clue2
(boot text) · **H** clue3 (post number; also a backup H in clue4) · **A** clue5
(frequency label `40.16A`). clue3's SIGNAL acrostic is the in-world "tutorial"
teaching that text hides things — no instruction ever names INTHA.

Overlay is styled Y2K retro-futuristic but on-theme: inverted glowing
`yabujin-logo.png` seal, holographic `★ INTHA UNLOCKED ★` banner, framed
`intha-anime.jpg` reward, enlarged centered CHALICE OF MIND video.

## Text conventions (do not "fix")

The creator's voice is intentional — preserve it when editing story text:
all lowercase, doubled commas `,,`, spaced-out words (`s o m e t h i n g`),
emoticons (`:}`, `;>`). `&...&` in `STORY.md` = the creator's own asides,
rendered on-page as `.note` (cool-blue italic margin glosses — present but
quiet). Name is **Guihetta**; forum/terminal handles are `guheitta_08` /
`guheitta@node_07` on purpose. Frequency is **40.16** MHz.

## Design tokens (`style.css`)

```
--bg #04040a · --surface #07070f · --text #b8b8cc · --dim #3e3e56
--accent #6e0016 (deep red) · --pale #222235 · --mono 'Courier New'
```
CRT scanline: `body::after` repeating-linear-gradient, `pointer-events:none`,
`z-index:9000`. `.note` cool-blue `#34506a`.

## Assets

Scenes: `index.jpg` (field), `entrytobunker.jpg` + `insidebunker.jpg` (clue1),
`clue4.jpg` (azeroy), `exit1-3.jpg` (exit collage bg).
INTHA overlay: `intha-anime.jpg` + `yabujin-logo.png`.
Decorative / easter media:
- clue2: `term-crt.jpg` (single static CRT background, `#terminal-frame::before`,
  hue-shifted violet), `lain-peek.png` (Iwakura Lain, fixed bottom-right,
  peeking — `#lain-peek`).
- clue4: `yabumon-card.png` — shown by the `yabumon` easter-egg button
  (`#yabumon-btn` → `#yabumon` holo-card overlay, `toggleYabumon()`).
- clue6: `gates-azeroy.jpg` — fullscreen wallpaper via `#wallpaper` (fixed,
  z-index -2, dark veil `::after`).
- exit: `exit1.jpg` only (single static `#exit-bg img`).

## Per-page visual notes

- **clue2 terminal is purple/magenta** (not green): an override `<style>` block
  recolours output/prompt/input (`#b15cff`/`#c77dff`/`#9d4edd`, err `#ff5c8a`).
- INTHA overlay (`#easter`) has a cheap animated shader (`#easter::before`: one
  blurred, slowly-rotating radial-gradient layer, GPU-composited; semi-
  transparent `#easter` bg lets it show; honours `prefers-reduced-motion`).
- Y2K accents (holo gradient text `@keyframes holo`, glows) live only inside the
  INTHA and yabumon overlays (both `display:none` until opened, so no idle cost).

## Performance / compatibility (keep it this way)

Chromium (Helium) lagged hard while Firefox was fine. Causes fixed and to AVOID
re-introducing:
- **`mix-blend-mode` / `background-blend-mode`** — Chromium-slow. Removed from
  exit bg + clue2. Don't add back.
- Full-viewport `repeating-linear-gradient` (old scanline) → now a 4px tiled
  `background-size` gradient.
- Animated **GIF** (constant repaint) — removed.
- Heavy images downscaled/recompressed (~7MB → ~2.5MB). Keep new images ≤ ~1600px
  / a few hundred KB; convert photo-PNGs to JPG.
- Animations/blurred filter layers are gated inside `display:none` overlays.
- Below-fold + overlay images use `loading="lazy" decoding="async"`.
- `text-size-adjust:100%` on `html` for mobile.

## Grading status (40/40 mechanics met)

All rubric items satisfied except hosting, which the user handles themselves:
8 pages, image-map index, clueN heading+intro+puzzle, video (clue5) + image
clues, NAVRH.md design doc, `lang="cs"` everywhere, index text centered,
bold/italic, return-to-index link + button + hover title on all non-index
pages.

## Pending / wishlist (not graded)

Story is authored & live. Still discussed but not done: more INTHA / "schizo"
hidden details, more depressing touches, more pictures on the normal clue pages
and easter eggs. A future Neocities host (currently user-handled).
