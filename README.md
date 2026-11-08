# A B Najeeb Rahman — Portfolio

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=20232A)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-animation-88CE02?logo=greensock&logoColor=111111)](https://gsap.com/)
[![Netlify](https://img.shields.io/badge/Netlify-ready-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Release notes](https://github.com/Sayonarakoto/FUTURE_FS_01/actions/workflows/release-notes.yml/badge.svg)](https://github.com/Sayonarakoto/FUTURE_FS_01/actions/workflows/release-notes.yml)

An editorial-style developer portfolio built with React, Vite, Tailwind CSS, GSAP, and Lenis. It presents selected projects, a learning-focused experience timeline, an animated name video, and a Netlify-powered contact form.

## Highlights

- Responsive editorial layout with cream, crow-black, and lavender-violet visual language.
- Horizontal desktop navigation with standard mobile scrolling.
- Animated hero name video with accessible text fallback.
- Reusable neumorphic UI components for cards, buttons, inputs, and sections.
- About timeline with current SDE internship and previous learning experiences.
- Contact form backed by a Netlify Function and Resend.
- Automatic GitHub release notes covering commits and changed files from the previous two months.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19, Vite 8 |
| Styling | Tailwind CSS 4, CSS variables |
| Motion | GSAP, Framer Motion, Lenis |
| Icons | Lucide React |
| Email | Netlify Functions, Resend |
| Hosting | Netlify |

## Project structure

```text
src/
├── assets/                  # CV, portrait, and hero name video
├── components/
│   ├── backgrounds/         # Decorative background primitives
│   ├── sections/            # Hero, Projects, About, and Contact
│   ├── ui/                  # Reusable neumorphic components
│   ├── HorizontalTrack.jsx  # Desktop horizontal scrolling
│   └── SectionWrapper.jsx   # Shared section layout
├── constants/               # Navigation and project data
├── hooks/                   # Motion and preference hooks
├── App.jsx                  # Application shell
└── index.css                # Design tokens and global styles
netlify/functions/           # Serverless contact-email function
.github/workflows/           # Automated release-note workflow
```

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- A Resend API key for the contact form

## Local development

```bash
git clone https://github.com/Sayonarakoto/portfolio.git
cd portfolio/my-portfolio
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

For the Netlify Function during local development, use the Netlify CLI:

```bash
npx netlify dev
```

## Environment variables

Create a `.env` file for local development, and add the same values in Netlify’s site environment settings:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_email@example.com
```

Do not commit `.env` files or API keys.

## Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create the production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Netlify deployment

The repository includes `netlify.toml` with these settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- Node.js version: 20

Connect the GitHub repository to Netlify, configure the environment variables, and deploy. Netlify will rebuild the site when changes are pushed to the connected branch.

### Netlify deploy-status badge

Netlify provides a live deploy-status badge, so a custom Edge API is not required. In Netlify, open **Project configuration → Developer settings → Deploy status badge**, copy the generated Markdown, and replace the placeholder below with the site-specific URL:

```md
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)
```

The badge can target a branch by appending `?branch=dev` to the image URL.

## Automated release notes

`.github/workflows/release-notes.yml` runs on pushes to `main` and can also be started manually. It creates or updates a dated GitHub release and includes:

- Commit subjects from the previous two months
- A unique-file list for the same period
- The current commit as the release target
## License

This portfolio is personal work by **A B Najeeb Rahman**. Contact the author before reusing personal content, images, or documents.
