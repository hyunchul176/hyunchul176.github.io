# Hyunchul Park — Personal Website

Modern minimalist personal website (HTML / CSS / vanilla JS) for
**Hyunchul Park**, Ph.D. student at the Cho Chun Shik Graduate School of
Mobility, KAIST.

Migrated from Google Sites → GitHub Pages.

## Structure

```
Website/
├── index.html       # Home
├── research.html    # Research themes & publications
├── projects.html    # Funded projects
├── cv.html          # CV (education, papers, talks, grants, awards)
├── news.html        # News timeline
├── 404.html         # Not-found page
├── favicon.svg      # Site icon (+ apple-touch-icon.png)
├── sitemap.xml      # Listed in robots.txt
├── robots.txt
├── assets/
│   ├── styles.css   # All styles (light + dark mode)
│   ├── script.js    # Theme toggle, news preview, carousels, copy-email
│   ├── og-card.jpg  # 1200x630 social preview image
│   ├── figures/     # Publication thumbnails + concept figures
│   ├── news/        # News carousel photos (<slug>-N.jpg)
│   └── projects/    # Funder logos
├── .nojekyll        # Tells GitHub Pages NOT to process via Jekyll
└── README.md
```

## Local preview

Just open `index.html` in a browser, or run any static file server:

```powershell
# from this directory
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages

### 1. Create a GitHub repo

Two common patterns:

| Pattern | Repo name | URL after deploy |
|---|---|---|
| **User site** (recommended for personal) | `<your-username>.github.io` | `https://<your-username>.github.io/` |
| **Project site** | any name (e.g. `website`) | `https://<your-username>.github.io/<repo>/` |

### 2. Push the files

```powershell
cd "C:\Users\TUPA\OneDrive\00 Personal\Website"

git init
git branch -M main
git add .
git commit -m "Initial site migration from Google Sites"

# Replace with your actual repo URL
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**.
2. **Source:** "Deploy from a branch".
3. **Branch:** `main` · **Folder:** `/ (root)`.
4. Save. After ~1 min the site is live at the URL above.

The `.nojekyll` file in this repo tells GitHub Pages to serve files as-is
(no Jekyll processing required).

### 4. (Optional) Custom domain

In **Settings → Pages → Custom domain**, enter your domain (e.g.
`hyunchulpark.com`), then add a `CNAME` record at your DNS provider
pointing to `<your-username>.github.io`.

## Customizing

### Profile photo
Replace `assets/profile.jpg`. It is referenced from `index.html`:
```html
<div class="profile-photo"><img src="assets/profile.jpg" alt="Hyunchul Park"></div>
```
The social preview card (`assets/og-card.jpg`) is built from the same
photo, so regenerate it when the photo changes.

### News images
Drop photos into `assets/news/` named `<slug>-N.jpg`, then point the
entry at them:
```html
<div class="carousel" data-slug="2026-09-nrf-grant" data-count="3"></div>
```
`data-count` must match the number of files on disk. An entry with no
`<div class="carousel">` simply renders without images.

Recommended size: **1200 × 750 px** (16:10), JPG, < 300 KB each.

### CV PDF
There is no PDF download button. `cv.html` is print-styled (the nav is
hidden in print), so *Print → Save as PDF* produces a clean CV. To bring
a real download button back, restore the `.cv-download` block — it is in
git history.

### Colors
All colors are literal hex values in `assets/styles.css`; there are no
CSS custom properties. The accent is `#004EA2` (KAIST blue), used
throughout light mode, with `#58a6ff` as its dark-mode counterpart.

### Add a publication
Copy an `<li>` block in `cv.html` under the Publications list, or a
`<div class="pub fig-lg">` block in `research.html` / `index.html`.
Thumbnails go in `assets/figures/`; a missing file falls back to a
"Figure coming" label via `onerror`, so nothing breaks.

## License

Content © Hyunchul Park. Code is free to reuse.
