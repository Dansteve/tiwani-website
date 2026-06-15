# Image attributions

The landing-page photography is sourced from [Unsplash](https://unsplash.com), used under the
[Unsplash License](https://unsplash.com/license) (free, no attribution legally required, credited
here as good practice). Each file was downloaded from the photographer's photo and committed
locally so the static export never depends on the Unsplash CDN at runtime (avoids broken images
and layout shift). All three are warm, human, diverse, non-clinical scenes that fit the product
(caregiving, family, connection, life across the lifespan).

> Placeholder note: these are tasteful stock photos chosen to fit the brief. Swap them for real
> TIWANI brand photography before launch (keep the same file names, aspect ratios, and `alt` text
> so no code changes are needed).

> Sizing note: the static export ships these images unoptimized (Next does not resize on
> `output: "export"`), so each file is committed already downscaled to delivery size (a width-1000
> cap, mozjpeg quality 80). The intrinsic `width`/`height` on each `next/image` matches the
> committed pixel size, and the aspect ratios are unchanged, so the swap-for-brand note above still
> holds (same names, same ratios, same `alt`); re-export a replacement at the same dimensions.

| File | Delivered size (aspect) | Photographer | Unsplash photo |
| --- | --- | --- | --- |
| `care-hero.jpg` | 1000x664 (landscape, 1.506:1) | Vitaly Gariev (@silverkblack) | https://unsplash.com/photos/mother-and-daughter-share-a-warm-loving-hug-VzqEWn1uxaM |
| `care-connection.jpg` | 1000x1500 (portrait, 2:3) | Lucas Favre (@we_are_rising) | https://unsplash.com/photos/a-child-on-a-mans-back-S0dxleXAVOU |
| `care-lifespan.jpg` | 1000x1500 (portrait, 2:3) | Nate Banks (@nate_banks) | https://unsplash.com/photos/a-man-and-a-little-girl-walking-down-the-street-dHDUFf9ggb4 |
