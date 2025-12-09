# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 application using the App Router with React 19 and Tailwind CSS 4.

### Tech Stack
- **Next.js 16** with App Router (`app/` directory)
- **React 19** with Server Components by default
- **Tailwind CSS 4** via `@tailwindcss/postcss` plugin
- **TypeScript** with strict mode enabled

### Project Structure
- `app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page (Server Component)
  - `globals.css` - Global styles with Tailwind and CSS variables
- `public/` - Static assets

### Path Aliases
- `@/*` maps to the project root (configured in `tsconfig.json`)

### Styling
- Tailwind CSS 4 uses `@import "tailwindcss"` syntax
- Theme customization via `@theme inline` block in `globals.css`
- CSS variables for colors: `--background`, `--foreground`
- Dark mode via `prefers-color-scheme` media query
