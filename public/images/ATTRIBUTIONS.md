# Image attributions

The landing-page photography:

- **`care-hero-family.jpg`** (the hero) is **TIWANI's own brand photography** (owner-provided), a warm, diverse family-at-home moment that fits the product. No third-party licence. Downscaled to a width-1000 delivery cap (1000x562 JPG, ~109 KB) from the source.
- The remaining two are tasteful **[Unsplash](https://unsplash.com)** placeholders, used under the [Unsplash License](https://unsplash.com/license) (free, no attribution legally required, credited here as good practice), to be swapped for real TIWANI photography before/after launch (keep the same file names, aspect ratios, and `alt` text so no code changes are needed). Each file is committed locally so the static export never depends on the Unsplash CDN at runtime (avoids broken images and layout shift).

> Sizing note: the static export ships these images unoptimized (Next does not resize on
> `output: "export"`), so each file is committed already downscaled to delivery size (a width-1000
> cap, JPEG quality 80). The intrinsic `width`/`height` on each `next/image` matches the committed
> pixel size, and the aspect ratios are unchanged, so the swap-for-brand note above still holds
> (same names, same ratios, same `alt`); re-export a replacement at the same dimensions.

| File | Delivered size (aspect) | Source |
| --- | --- | --- |
| `care-hero-family.jpg` | 1000x562 (landscape, 16:9) | TIWANI brand photography (owner-provided) |
| `care-connection.jpg` | 1000x1500 (portrait, 2:3) | Unsplash, Lucas Favre (@we_are_rising) - https://unsplash.com/photos/a-child-on-a-mans-back-S0dxleXAVOU |
| `care-lifespan.jpg` | 1000x1500 (portrait, 2:3) | Unsplash, Nate Banks (@nate_banks) - https://unsplash.com/photos/a-man-and-a-little-girl-walking-down-the-street-dHDUFf9ggb4 |
