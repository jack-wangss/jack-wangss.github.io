# NaiFan — 3D Interactive Homepage

A dark, graphics-style personal homepage featuring an interactive 3D scene built with **Three.js** and custom **GLSL shaders**. Deployed on GitHub Pages.

**Live:** https://jack-wangss.github.io/

## Features

- **Interactive 3D scene** — a noise-displaced icosahedron with Fresnel rim lighting, wireframe overlay, and a 1500-particle field
- **Custom GLSL shaders** — vertex displacement via Simplex noise + gradient fragment shader (cyan → purple)
- **Orbit controls** — drag to rotate, scroll to zoom, idle auto-rotate with mouse parallax
- **Dark graphics aesthetic** — neon gradients, glassmorphism cards, geometric feel
- **Responsive** — adapts to mobile, tablet, and desktop
- **Performance-aware** — pixel ratio capped, pauses when tab is hidden

## Tech Stack

| Tech | Usage |
|------|-------|
| Three.js (r160) | WebGL 3D rendering (via CDN, no build step) |
| GLSL | Custom vertex & fragment shaders |
| CSS3 | Styling, animations, glassmorphism, responsive grid |
| Vanilla JS | Scene logic, scroll reveal (IntersectionObserver) |
| Jekyll | Static site generation (minimal — just layouts/includes) |

## Project Structure

```
├── index.html              # Main page (hero + projects + footer)
├── _config.yml             # Jekyll config
├── _layouts/default.html   # Minimal HTML skeleton
├── _includes/head.html     # <head> — fonts, CSS, Three.js CDN
├── assets/
│   ├── css/style.css       # All styles, design tokens, animations
│   └── js/scene.js         # Three.js scene, shaders, interaction
└── LICENSE
```

## Run Locally

### Option 1: Jekyll (if Ruby is installed)
```bash
bundle exec jekyll serve
```
Then open http://localhost:4000

### Option 2: Any static server
```bash
npx serve .
# or
python -m http.server 4000
```

## Deploy

Push to the `main` branch — GitHub Pages auto-deploys to https://jack-wangss.github.io/

## License

MIT
