# News images

Carousel photos for `news.html`. One entry can hold several images.

## Naming

```
<slug>-1.jpg, <slug>-2.jpg, ...
```

The slug is yours to choose (convention: `YYYY-MM-short-name`). Wire the
files to an entry with a carousel div, where `data-count` must equal the
number of files on disk:

```html
<div class="carousel" data-slug="2026-09-nrf-doctoral-grant" data-count="1"></div>
```

`assets/script.js` builds the `<img>` tags from those two attributes, so
a `data-count` higher than the number of files leaves a broken image.
An entry with no carousel div simply renders without photos.

## Format

- **1200 px wide**, JPG, under 300 KB each.
- Any aspect ratio works. The frame is 4:3 and uses `object-fit: contain`,
  so wider or taller images sit letterboxed rather than cropped.

Raw originals live in `Images/` (git-ignored); only the processed copies
here are published.
