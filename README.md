# Hello Puzzle

**Hello Puzzle** is a sliding tile puzzle: shuffle pieces, then slide them back into order. You can load a random image (via the Unsplash API) or upload a picture from your device. The app is not named after Unsplash and does not use Unsplash’s logo.

Online demo: https://hello-puzzle.netlify.app

## Unsplash API (submission checklist)

- **Hotlink:** The client loads images from Unsplash URLs returned under `photo.urls` (800×800 crop params on the CDN URL), not a rehosted file.
- **Download:** The Netlify function calls `GET` on `links.download_location` (unchanged) so usage is reported to Unsplash.
- **Attribution:** UI shows **Photo by [photographer] on Unsplash** with links to the photographer’s profile and [unsplash.com](https://unsplash.com/) (with `utm_medium=referral`).
- **Naming:** Product name is **Hello Puzzle** — not “Unsplash” or similar. For the Unsplash developer portal, use the same name and this description so reviewers can tell what the app does.
- **Screenshots:** Add screenshots of the puzzle + attribution line when you apply for production access or rate limits.

## Stack

- React 19
- Vite 7
- styled-components
- Lodash

## Requirements

- Node.js `>= 20`

## Environment Variables

- `UNSPLASH_ACCESS_KEY` (required for the puzzle-image function on Netlify / `netlify dev`).
- `VITE_FUNCTIONS_ORIGIN` (optional, local only): set in `.env.development` when you run **`npm run dev:vite`** while Netlify Functions are served separately (e.g. `http://localhost:8888` from `netlify dev`). **`npm run dev`** proxies the app and functions together; relative `/.netlify/functions/puzzle-image` is enough in production.

## Netlify Functions

- Functions live under `netlify/functions/`. The puzzle image handler is the directory **`puzzle-image/`** (entry `index.js`); the URL stays **`/.netlify/functions/puzzle-image`**.
- It returns JSON (`imageUrl`, `attribution`); the client loads the Unsplash CDN URL from `imageUrl`.
- Local dev with Vite + functions: **`npm run dev`** (Netlify Dev + Vite).

## Scripts

- `npm run dev` - start Netlify local dev (Vite + Functions)
- `npm run dev:vite` - start Vite only (no Netlify Functions)
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run format` - format JS/JSX files with Prettier

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL printed by the dev server.

## Gameplay

- Load an image from the web or upload one from your device.
- The image is sliced into tiles and shuffled using valid moves.
- Solve the puzzle by sliding adjacent tiles until order is restored.

## Project Structure

```txt
src/
  app/                      # app shell + app-level state/controller
    App.jsx
    App.styles.js
    AppHeader.jsx
    AppHeader.styles.js
    useAppController.js
    appState.js
    index.js
  components/
    board/                  # board orchestration + domain logic
      Board.jsx
      BoardView.jsx
      boardMapTools.js
      boardState.js
      useBoardController.js
      BoardView.styles.js
      index.js
    item/                   # puzzle tile component
      Item.jsx
      Item.styles.js
    loading/                # loading spinner component
      Loading.jsx
      Loading.styles.js
    picture/                # image source + meta band (attribution / fetch errors)
      PictureMetaSection.jsx
      PictureMetaSection.styles.js
      PictureAttribution.styles.js   # shared layout tokens + attribution links
      PictureSourceActions.jsx
      PictureSourceActions.styles.js
      index.js
  shared/
    ui/                     # shared UI primitives
      button/
        Button.jsx
        Button.styles.js
      upload/
        Upload.jsx
        Upload.styles.js
    lib/                    # shared utils/services
      imagePieces.js
    styles/                 # design tokens + app global style
      tokens.js
      AppGlobalStyle.js
  index.jsx
netlify/
  functions/
    puzzle-image/           # Unsplash random photo + download ping + JSON for client
      index.js              # HTTP handler
      constants.js
      responses.js
      urlUtils.js
      unsplash.js
```

## Import Aliases

The project uses a single root alias:

- `@` -> `src`

Examples:

- `@/app/App`
- `@/components/board`
- `@/components/picture`
- `@/shared/ui/button`

## Styling Conventions

- Styling uses `styled-components`.
- Component files focus on behavior/render.
- Styled definitions are colocated in `*.styles.js` files.
- App-wide base styles are declared in `src/shared/styles/AppGlobalStyle.js`.
- Shared color tokens live in `src/shared/styles/tokens.js`.

## Notes

- Puzzle shuffling is done via legal tile moves, so generated boards stay solvable.
- Non-square board support is handled in both board mapping and image slicing logic.
- Image loading uses `/.netlify/functions/puzzle-image` with Unsplash hotlinked image URLs.
