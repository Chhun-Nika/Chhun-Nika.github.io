# Chhun Nika’s Developer Portfolio

Chhun Nika is a Software Engineering student at the Cambodia Academy of Digital Technology. This portfolio supports internship applications in web development, frontend engineering, and UI/UX. It will show Nika’s growth through projects, professional experience, volunteer work, and achievements. Reviewers should be able to understand what each project does, what Nika personally contributed, and where to see the work.

## First-version scope

- Open with a personal introduction, Nika’s own portrait, and links to projects and the CV.
- Place Technical Skills near the top, with programming languages listed first.
- List projects newest first. Each card opens a dedicated page with the project overview, Nika’s role, completed tasks, and any available GitHub links, screenshots, or demos.
- Include professional experience, volunteer work, achievements, and contact information.
- Keep the first version achievable in roughly eight hours. Use a responsive layout and keep motion smooth and intentional.

## Stack and local setup

React, TypeScript, Vite, Tailwind CSS, and React Router. This is a static frontend. Project data will live in local files, with no backend, database, or authentication.

Use Node.js 20.19+ on the 20.x line or 22.12+.

```sh
npm ci           # Install dependencies from the lockfile
npm run dev      # Start the development server
npm run build    # Type-check and build to dist/
npm run preview  # Preview the production build locally
```

Open the local URL printed by Vite. Each card under Selected Projects opens a `/projects/:slug` route, such as `/projects/modula-pos`. Edit the card summaries and detail copy in `src/data/projects.ts`.

## Decisions for later

The starting preferences are a pure white canvas, rounded elements, expressive typography, and a portrait-led introduction. We’ll decide the layout, typefaces, palette, and motion together. We’ll also choose the portrait and project evidence and write the introduction, project descriptions, experience, volunteer work, achievements, CV, and contact details.
