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
├── cv.html          # CV (education, papers, talks, awards)
├── news.html        # News timeline
├── assets/
│   ├── styles.css   # All styles (light + dark mode)
│   └── script.js    # Mobile nav toggle + active link
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
Replace the "HP" placeholder in `index.html` `.hero-photo`:
```html
<div class="hero-photo"><img src="assets/profile.jpg" alt="Hyunchul Park" /></div>
```

### News images
Drop photos into `assets/news/` using the filenames listed in
[`assets/news/README.md`](assets/news/README.md). Each news entry already
has a `<figure>` slot that **auto-hides** if its file is missing — so you
can add images one at a time without breaking the layout.

To get the originals from your Google Sites:
1. Open https://sites.google.com/view/hyunchul17/news
2. Right-click each image → *Save image as...*
3. Rename to match the expected filename, drop into `assets/news/`

### CV PDF
Drop `CV_Hyunchul_Park.pdf` into `assets/`, then uncomment the
Download PDF button in `cv.html`.

### Colors
Edit the CSS variables at the top of `assets/styles.css`
(`--accent`, `--accent-soft`, `--bg`, etc.).

### Add a publication
Copy a `<li>` block in `cv.html` under the Publications list, or an
`<article class="card">` block in `research.html`.

## License

Content © Hyunchul Park. Code is free to reuse.
