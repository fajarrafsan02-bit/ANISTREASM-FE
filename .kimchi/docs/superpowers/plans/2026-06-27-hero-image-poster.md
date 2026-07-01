# Hero Image Poster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch the hero section background image source from `banner` to the sharper `poster` image while preserving layout and text readability.

**Architecture:** The hero background is rendered by `HeroBackground.jsx`. The data model from `AnimeMapper.js` exposes the poster URL as `anime.image` and the banner URL as `anime.banner`. The change is limited to that single component, keeping existing overlays and animation behavior intact.

**Tech Stack:** React, Vite, Tailwind CSS, pnpm.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/components/Home/hero/HeroBackground.jsx` | Renders the active hero slide background image. This is the only file modified. |

---

## Task 1: Switch Hero Background to Poster Image

**Files:**
- Modify: `src/components/Home/hero/HeroBackground.jsx`
- Verify: visual/manual + `pnpm run lint`

### Step 1: Update image source and object position

Open `src/components/Home/hero/HeroBackground.jsx`.

Change the image `src` from `anime.banner` to `anime.image`:

```jsx
<img
    src={anime.image || undefined}
    alt=""
    fetchPriority={isActive ? "high" : "low"}
    className="absolute inset-0 w-full h-full object-cover"
    style={{
        objectPosition: 'top center',
        filter: getImageFilter(isDark),
    }}
    onError={(e) => { e.target.style.opacity = '0'; }}
/>
```

Only two changes are needed inside the `<img>`:
- `src={anime.image || undefined}`
- `objectPosition: 'top center'` (was `center center`)

### Step 2: Run lint

Run: `pnpm run lint`
Expected: no errors.

### Step 3: Manual visual verification

Run: `pnpm run dev`
Open the home page in a browser.

Verify:
- Hero background images are now loaded from the same poster URLs used in the catalog.
- Images appear sharper than before.
- `object-position: top center` keeps the important top portion of the poster visible.
- Text content over the hero remains readable.
- No broken-image icons appear.

### Step 4: Commit

```bash
git add src/components/Home/hero/HeroBackground.jsx

git commit -m "feat(hero): use poster image for sharper hero background

Switch hero background source from anime.banner to anime.image
and set object-position to top center to preserve key art."
```

---

## Self-Review

1. **Spec coverage:** The spec requires using poster source, keeping overlays, and verifying text readability — all covered in the single task above.
2. **Placeholder scan:** No TODO/TBD/vague instructions; exact code and commands are provided.
3. **Type consistency:** Uses `anime.image` which is the field exposed by `mapToHeroAnime` for the poster URL.
