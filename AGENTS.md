# Highway Lyrics Agent Instructions

- **Framework:** Next.js (Pages router), TypeScript, Tailwind CSS.
- **Database:** MongoDB via Mongoose.
- **Authentication:** Custom session encryption via Web Crypto (AES-GCM) in `src/lib/session.ts`. Middleware in `src/middleware.ts` protects sensitive routes.

## Development Constraints & Gotchas
- **Database Connection:** Uses a global client in `development` for HMR efficiency, production uses per-request instantiation.
- **Environment Variables:** Must be set: `MONGODB_URI`, `SESSION_SECRET` (32 bytes), `PASSWORD` (for middleware), `NODE_ENV`.
- **Duplicate Detection:** Utility `src/utils/findDuplicates.ts` uses `/api/searchSongs` with `minSimilarity: 1.0`.

## Scripts
- `npm run dev`: Start dev server.
- `npm run test`: Run Jest suite.
- `npm run lint`: Check linting.
- `npm run build`: Build production.

## API Notes
- Endpoints are under `src/pages/api/`.
- `POST /api/newSong`: Requires `title` and `lyrics`.
- `POST /api/login`: Handles session creation.
