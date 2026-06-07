# Highway Lyrics Project - Essential Details

This document outlines the essential details of the "Highway Lyrics" project, including its technology stack, core functionality, API endpoints, and environmental considerations.

## Project Overview

*   **Name:** highway-lyrics
*   **Description:** A web application for managing and displaying song lyrics.
*   **Technology Stack:**
    *   **Framework:** Next.js
    *   **UI Library:** React
    *   **Language:** TypeScript
    *   **Database:** MongoDB with Mongoose ORM
    *   **Styling:** Tailwind CSS
    *   **Text Editor:** Tiptap (with extensions for bold, document, highlight, italic, paragraph, text)
    *   **Testing:** Jest
    *   **Linting:** ESLint
*   **Scripts:**
    *   `dev`: Starts the development server (`next dev`)
    *   `build`: Builds the application for production (`next build`)
    *   `start`: Starts the production server (`next start`)
    *   `lint`: Runs ESLint for code linting (`next lint`)
    *   `test`: Runs tests with Jest (`jest --verbose`)
*   **Deployment:** Primarily designed for deployment on the Vercel Platform.

## Core Functionality

### Database Integration
The application connects to a MongoDB database using the official `mongodb` driver and `mongoose` for object modeling. The connection URI is fetched from environment variables. In development, a global client instance is used for Hot Module Replacement (HMR) efficiency, while in production, a new client is instantiated per request.

### Song Management
The `src/lib/songs.ts` module provides the core logic for interacting with song data in MongoDB:
*   `getAllSongs()`: Retrieves all songs, sorts them by title, and returns them.
*   `getSongById(songId: string)`: Fetches a single song by its MongoDB `_id`.
*   `searchSongs(searchKey: string, minSimilarity: number)`: Performs a text search on song content, returning results with a similarity score above a specified threshold.
*   `postNewSong(title: string, lyrics: string)`: Inserts a new song into the database with a title, lyrics, creation/update timestamps, and placeholder `addedby`/`approvedby` fields.

### Authentication and Session Management
The application implements a basic authentication mechanism:
*   **Middleware:** `src/middleware.ts` protects specific routes (e.g., `/addSongs`). It decrypts a session cookie and checks for a valid `userId` and a predefined password (from environment variables) before allowing access. Unauthorized users are redirected to `/login`.
*   **Session Encryption:** `src/lib/session.ts` provides `encrypt` and `decrypt` functions using the Web Crypto API (AES-GCM algorithm). A secret key, defined by `SESSION_SECRET` environment variable, is used for encryption.
*   **Login API:** The `/api/login` endpoint handles setting the encrypted session cookie upon successful authentication. The cookie is `httpOnly` and `secure` in production, with a one-day expiry.

### Duplicate Song Detection
The `src/utils/findDuplicates.ts` utility function facilitates checking for exact song duplicates by calling the `/api/searchSongs` endpoint with a `minSimilarity` of `1.0`. It limits the returned results to a maximum of 5.

## API Endpoints

The following API endpoints are available under `src/pages/api/`:

*   `GET /api/allSongs`:
    *   **Description:** Retrieves a list of all songs in the database.
    *   **Response:** `{"songs": [...]}` or `{"error": "..."}`
*   `GET /api/song?songId=[id]`:
    *   **Description:** Retrieves a single song by its unique MongoDB ID.
    *   **Parameters:** `songId` (string, required) - The ID of the song to retrieve.
    *   **Response:** `{"song": {...}}` or `{"error": "..."}`
*   `GET /api/searchSongs?key=[searchKey]&minSimilarity=[minSimilarity]`:
    *   **Description:** Searches for songs based on a text `key` with an optional `minSimilarity` score.
    *   **Parameters:**
        *   `key` (string, required) - The search term.
        *   `minSimilarity` (number, optional, default: 0.5) - The minimum similarity score for results.
    *   **Response:** `{"songs": [...]}` or `{"error": "..."}`
*   `POST /api/newSong`:
    *   **Description:** Adds a new song to the database.
    *   **Request Body:** `{"title": "Song Title", "lyrics": "Song Lyrics"}`
    *   **Response:** `{"success": true, "insertedId": "..."}` or `{"success": false, "error": "..."}`
*   `POST /api/login`:
    *   **Description:** Handles user login by encrypting session data and setting an authentication cookie.
    *   **Request Body:** (Object containing user credentials, e.g., `{"userId": "...", "password": "..."}`)
    *   **Response:** `{"message": "...", "success": true}`

## Environment Variables

The application relies on the following environment variables:

*   `MONGODB_URI`: The connection string for the MongoDB database.
*   `SESSION_SECRET`: A secret key (must be 32 bytes) used for encrypting and decrypting session data.
*   `PASSWORD`: The password used by the middleware to authenticate users for protected routes.
*   `NODE_ENV`: The current environment (e.g., `development`, `production`). Used to configure MongoDB client behavior and cookie security.
