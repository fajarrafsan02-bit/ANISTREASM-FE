# Design: Hero Background Image Quality Improvement

## Goal
Make the hero section background image look clearer, similar to the images on the catalog page.

## Context
- Project: React + Vite + Tailwind CSS anime streaming frontend.
- Current hero uses `anime.banner` as the full-width background image.
- Catalog page uses `anime.poster` (portrait) and looks sharper.
- `HeroBackground.jsx` applies a brightness/contrast filter and gradient overlays that reduce perceived sharpness.

## Proposed Approaches (reviewed)
1. **Use `poster` instead of `banner`** in the hero background.
2. Reduce filter & overlays while keeping `banner`.
3. Combine `poster` foreground + blurred `banner` background.

**Selected approach:** #1 — switch the hero background source to the higher-quality poster image.

## Design Details

### File to change
- `src/components/Home/hero/HeroBackground.jsx`

### Changes
1. Replace `src={anime.banner || undefined}` with `src={anime.image || undefined}`.
   - `mapToHeroAnime` maps `anime.poster` to the `image` field, so `anime.image` contains the poster URL.
2. Change `objectPosition` from `center center` to `top center` so the portrait poster crops from the top, preserving faces/key art when filling a wide container.
3. Keep existing color grade, vignette, and overlays so text readability is preserved.
4. Keep `onError` fallback behavior: hide the image if it fails to load, leaving the preset color gradient visible.

### Risks & Mitigations
- **Crop:** Portrait poster in a landscape hero will be cropped. Mitigation: `object-position: top center`.
- **Text contrast:** Poster is brighter/cleaner than banner. Mitigation: existing overlays remain unchanged.
- **Missing image:** Poster may be unavailable for some entries. Mitigation: `onError` hides the broken image; color gradient remains as fallback.

## Verification
1. Run `pnpm run dev` and open the home page.
2. Compare hero slide images with catalog card images; they should now come from the same poster source.
3. Confirm no broken-image icon appears and text remains readable.
4. Run `pnpm run lint` to ensure no lint errors.

## Out of Scope
- Backend changes (e.g., providing a higher-resolution banner).
- Major layout rework of the hero section.
- Changes to carousel behavior or autoplay.
