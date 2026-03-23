# Hello Puzzle

Sliding puzzle game built with React + Vite.

## Stack

- React 19
- Vite 7
- Sass (SCSS modules)
- Lodash

## Requirements

- Node.js `>= 20`

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run format` - format JS/JSX/SCSS files with Prettier

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

## Project Structure

```txt
src/
  app/                    # app shell + app-level state/controller
  components/
    board/                # board feature and its internal logic
      Board.jsx
      BoardView.jsx
      boardState.js
      boardMapTools.js
      useBoardController.js
    item/                 # reusable puzzle tile component
    loading/              # reusable loading spinner component
  shared/
    ui/                   # shared UI primitives
      button/
      upload/
    lib/                  # shared utils/services
      imagePieces.js
    styles/               # global design tokens/animations
      tokens.scss
      animations.scss
```

## Import Aliases

The project uses a single root alias:

- `@` -> `src`

Examples:

- `@/app/App`
- `@/components/board`
- `@/shared/ui/button`

## Notes

- Puzzle shuffling is done via legal tile moves, so generated boards stay solvable.
- Styling is SCSS modules + shared tokens in `src/shared/styles/tokens.scss`.
