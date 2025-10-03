# Zoo
 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index dd211022a500509dc8255d706a0327c31ccad4dc..73d7a53634df966cb77920baaa32efbd6d623a0e 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,25 @@
-# Zoo
+# WildScape Virtual Zoo
+
+A polished, immersive virtual zoo experience built with HTML, CSS, and JavaScript. Explore detailed animal profiles, discover habitats, follow a live behavior feed, and plan your virtual visit with an interactive schedule.
+
+## Features
+
+- **Interactive animal showcase** – Filter by habitat, conservation status, favorites, or search by name/species.
+- **Dynamic behavior feed** – Watch randomized animal behaviors in real time for a lively experience.
+- **Habitat explorer** – Dive into curated habitats with climate info, highlights, and resident lists.
+- **Daily adventure schedule** – Stay on top of special keeper talks and enrichment sessions.
+- **Responsive glassmorphism design** – Modern styling, animations, and accessible interactions across devices.
+
+## Getting Started
+
+1. Open `index.html` in your browser.
+2. Interact with search and filter controls to explore the animal residents.
+3. Toggle favorites, browse habitats, and follow the live behavior updates.
+
+## Tech Stack
+
+- HTML5 semantic layout
+- Modern CSS (flexbox, grid, glassmorphism styling)
+- Vanilla JavaScript with object-oriented architecture
+
+Enjoy your visit to WildScape! 🦁🌿
 
EOF
)
