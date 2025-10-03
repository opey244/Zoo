# WildScape Virtual Zoo

A polished, immersive virtual zoo experience built with HTML, CSS, and JavaScript. Explore detailed animal profiles, discover habitats, follow a live behavior feed, and plan your virtual visit with an interactive schedule.

## Features

- **Interactive animal showcase** – Filter by habitat, conservation status, favorites, or search by name/species.
- **Dynamic behavior feed** – Watch randomized animal behaviors in real time for a lively experience.
- **Habitat explorer** – Dive into curated habitats with climate info, highlights, and resident lists.
- **Daily adventure schedule** – Stay on top of special keeper talks and enrichment sessions.
- **Responsive glassmorphism design** – Modern styling, animations, and accessible interactions across devices.

## Getting Started

1. Download or clone this repository to your computer.
2. Open the project folder and double-click `index.html` (or choose *Open With → Browser*) to launch the virtual zoo.
3. Interact with search and filter controls to explore the animal residents.
4. Toggle favorites, browse habitats, and follow the live behavior updates.

### Optional: serve locally

You can use a lightweight static server if you prefer accessing the project via `http://localhost`:

```bash
# From the project directory
python -m http.server 8000
# or
npx serve .
```

Then open the shown URL in your browser.

## Testing

Run the core logic test suite with Node's built-in test runner:

```bash
npm test
```

## Publishing to GitHub

1. Ensure you have a GitHub repository created for the project.
2. Add your remote if it is not already configured:

   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   ```

   *(Use the SSH URL if you prefer `git@github.com:...`.)*

3. Make sure you're on the `work` branch (the branch used in this project):

   ```bash
   git checkout work
   ```

4. Commit any local changes:

   ```bash
   git add .
   git commit -m "Describe your update"
   ```

5. Push the branch to GitHub and set the upstream tracking branch:

   ```bash
   git push -u origin <branch-name>
   ```

6. Open GitHub to create a pull request or share the branch directly.

> 💡 **Tip:** After the first push, you can simply run `git push` for subsequent updates on the same branch.

Once pushed, you (or anyone else) can view the project by opening the `index.html` file from the repository or hosting it on a static site service such as GitHub Pages, Netlify, or Vercel.

## Tech Stack

- HTML5 semantic layout
- Modern CSS (flexbox, grid, glassmorphism styling)
- Vanilla JavaScript with object-oriented architecture

Enjoy your visit to WildScape! 🦁🌿
