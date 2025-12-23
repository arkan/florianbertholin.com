# Florian Bertholin's Personal Website

A personal website and blog built with [Astro](https://astro.build), featuring a clean design and modern web development practices.

## Tech Stack

- **Framework**: [Astro](https://astro.build) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com)
- **Analytics**: [Umami](https://umami.is) - Privacy-focused analytics
- **Deployment**: GitHub Pages (automated)

## Features

- Blog with Markdown support
- Reading time estimation
- Auto-generated table of contents
- GitHub Flavored Markdown
- Tag system for posts
- RSS feed
- Automatic sitemap generation
- SEO optimized with meta tags and JSON-LD
- Responsive design

## Prerequisites

This project uses [mise](https://mise.jdx.dev/) for managing tool versions.

```bash
# Install mise (macOS/Linux)
curl https://mise.run | sh

# Trust and install project tools
mise trust
mise install
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start local dev server at `localhost:4321`  |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview build locally before deploying      |
| `npm run astro`   | Run Astro CLI commands                      |

## Project Structure

```
├── src/
│   ├── components/     # Reusable Astro components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Pages and blog posts
│   ├── styles/         # Global styles
│   ├── js/             # Utility functions
│   ├── data/           # Static data (site config, navigation)
│   └── images/         # Image assets
├── public/             # Static assets (favicon, robots.txt)
├── .mise.toml          # Tool version management
└── astro.config.mjs    # Astro configuration
```

## Deployment

All commits to the `main` branch are automatically deployed to GitHub Pages via GitHub Actions.

## License

MIT
