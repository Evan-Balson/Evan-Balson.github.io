# Evan Balson - Engineering Portfolio

Static portfolio ready for GitHub Pages. No installation or build step is required.

## Upload and publish

1. Create or open your GitHub repository.
2. Upload the CONTENTS of this folder to the repository root. index.html must be at the root, alongside app.js, data.js, the two CSS files and assets/. Preserve the asset subfolders.
3. Commit the files to main.
4. Open Settings > Pages.
5. Under Build and deployment, select Deploy from a branch, then main and /(root), and save.
6. GitHub will display the published URL on the Pages settings screen when deployment completes.

For a personal homepage, name the repository <your-github-username>.github.io. Other repository names publish at a repository subpath; this portfolio uses relative asset paths and works there too.

If your repository already uses GitHub Actions for Pages, change the source to Deploy from a branch for these instructions.

## Files

- index.html: site entry point
- data.js: approved profile and project content
- app.js: rendering, navigation and presentation
- styles.css and presentation.css: responsive styling
- assets/: linked screenshots, diagrams, documents and favicon
- .nojekyll: serves the portfolio as a static site

## Local preview

From this folder, run python -m http.server 8000 and open http://localhost:8000.

Contact fields can be updated in data.js when their final values are available.
