# Elie Wamana — Portfolio

Static personal portfolio (HTML + CSS + vanilla JS, no build step) for GitHub Pages.

## Deploy
1. Create a public repo named **`Z313PH.github.io`**.
2. Upload everything in this folder (keep `.nojekyll`) to the repo root on `main`.
3. Repo **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**.
4. Live at **https://z313ph.github.io/** within a minute or two.

## Editing
| What | Where |
|---|---|
| Text, experience, featured projects | `index.html` |
| Colors, fonts, spacing (light + dark tokens) | top of `assets/css/style.css` |
| "Every public repository" list | `REPOS` array in `assets/js/main.js` |
| Résumé download | replace `assets/Elie_Wamana_Resume.pdf` |
| Profile photo | add `assets/profile.jpg`, uncomment the `<img>` in the hero avatar |
| Project screenshots | inside any `.project-visual`, replace the mock markup with `<img src="assets/shots/name.webp" alt="">` |
