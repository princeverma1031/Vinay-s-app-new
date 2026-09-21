# dumb-jokes — agent notes

## Stack
- **Framework:** Create React App 3.4.1 (`react-scripts`, webpack 4). Not ejected.
- **React:** 16.13 with class components; no router, no state library, no TypeScript.
- **Package manager:** npm (`package-lock.json`, lockfileVersion 1). Install with `npm ci`.
- **Data:** jokes fetched live from `https://icanhazdadjoke.com` via axios; votes and jokes persisted in `localStorage`. No backend.
- **Styling:** plain CSS files next to each component (`App.css`, `Joke.css`, `JokeList.css`). Arrow/spinner icons from a Font Awesome kit loaded by CDN in `public/index.html`.
- **Emoji artwork:** local flat-style SVGs in `src/emojis/` (yellow `#ffd764` face, `#4a4a4a` features, `#fa645a` mouth, `#00b4dc` tears). `laughing-tears.svg` is the sidebar mascot; the other six are the per-joke mood faces. Import them as image URLs (`import x from './emojis/x.svg'`) and add new moods in the same style rather than pulling in an emoji library.

## Structure
- `src/index.js` — entry; renders `App` into `#root`.
- `src/App.js` — wraps `JokeList`.
- `src/JokeList.js` — fetches/dedupes jokes, handles voting, sorts by votes, persists to localStorage.
- `src/Joke.js` — single joke row with up/down vote; `getColor`/`getEmoji` map the vote count to a ring color and a face from `src/emojis/`.
- `src/App.test.js` — smoke test (`renders without crashing`).

## Running in the Draftbit sandbox (important)
The platform does not manage this project's dev server; the saved sandbox init script does. It runs the CRA dev server on port `$CURRENT_METRO_PORT` (14101 in this sandbox), logging to `/tmp/preview-server.log`.

CRA 3 needs these env vars to run here — keep them if you ever restart it by hand:
- `CI=true` — CRA's start script exits as soon as stdin ends; detached processes have no stdin, so without this the server dies right after "Starting the development server...".
- `NODE_OPTIONS=--openssl-legacy-provider` — webpack 4 on Node ≥ 17 otherwise fails with `ERR_OSSL_EVP_UNSUPPORTED`.
- `BROWSER=none`, `PORT=<port>`, `HOST=0.0.0.0`, `DANGEROUSLY_DISABLE_HOST_CHECK=true` — headless, correct port, reachable through the preview proxy.
- `CHOKIDAR_USEPOLLING=true` — reliable hot reload inside the container.

Manual restart:
```bash
kill -9 $(netstat -tulpn 2>/dev/null | grep :14101 | awk '{print $7}' | cut -d'/' -f1)
setsid -f bash -c "CI=true NODE_OPTIONS=--openssl-legacy-provider BROWSER=none PORT=14101 HOST=0.0.0.0 DANGEROUSLY_DISABLE_HOST_CHECK=true CHOKIDAR_USEPOLLING=true ./node_modules/.bin/react-scripts start" > /tmp/preview-server.log 2>&1 < /dev/null
```

## Checks
- Tests: `CI=true NODE_OPTIONS=--openssl-legacy-provider npm test -- --watchAll=false`
- Lint: CRA's built-in ESLint (`react-app` config) runs inside the dev server; warnings show in the log.
- Production build: `NODE_OPTIONS=--openssl-legacy-provider npm run build` (deployment itself is handled by Draftbit Publishing).

## Conventions
- Extend the existing class-component + co-located CSS pattern; don't introduce a router, CSS-in-JS, or TypeScript unless asked.
- Keep the `uuid/v4` deep import as-is (lockfile pins uuid 3.4.0; uuid ≥ 7 removed that path).
- Don't commit; the user saves their work from Draftbit.
