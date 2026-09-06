# Project Aura

An AI-assisted classical composition tool. Users specify an ensemble level, mood
(optionally an emotional arc), historical period/style, and exact instrumentation
via a seating-chart; the brief is meant to drive a [music21](https://www.music21.org/music21docs/)-based
generator on the backend.

**Status:** only the front-end selection wizard (this repo's actual deliverable
so far) is built. Generation is stubbed out.

## Stack

- `frontend/` — React (Vite)
- `backend/` — Node.js (Express)
- `backend/services/music21Bridge.js` — the seam where a Python subprocess
  running music21 will be invoked; music21 is Python-only, so Node cannot
  call it directly. Not implemented yet.
- Firebase (Firestore) — wired for later use, not called from anywhere yet
  (`frontend/src/firebase.js`, `backend/services/firebaseAdmin.js`)

## Design

Colors are sampled directly from mahlerfoundation.org: cream background
(`#F7F6F2`), deep teal (`#11333E`), gold accent (`#FBC203`). See
`frontend/src/styles/tokens.css`.

## Running it

This machine doesn't have Node.js installed yet — install it from
[nodejs.org](https://nodejs.org) (LTS) first.

```bash
cd frontend
npm install
npm run dev
```

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The frontend dev server proxies `/api` to `http://localhost:4000`.

## What's next

- Title/logo in the header is intentionally left blank (`app-header__mark`
  in `App.jsx`) — to be added later.
- `POST /api/compose` accepts `{ level, mood, period, seating }` and currently
  501s — that's where the music21 subprocess call goes.
- Firebase project isn't created yet; fill in `.env` files from the
  `.env.example` templates once it exists.
