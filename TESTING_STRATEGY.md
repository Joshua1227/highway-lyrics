# Updated Testing Strategy for Highway Lyrics (Goal: 70% Coverage)

This plan focuses on increasing the test coverage to at least 70% by targeting critical business logic, error handling, and high-priority components.

## 1. Coverage Gap Analysis
- **`components/` (currently ~9%):** Needs tests for interaction, state changes, and rendering of all sub-components.
- **`lib/` (Untested):** Core database and logic files are currently not contributing to the coverage.
- **`pages/api/` (currently ~78%):** Needs tests for remaining endpoints (`song.ts`, `searchSongs.ts`, `login.ts`, `newSong.ts`).
- **`utils/` (currently ~68%):** Needs tests for edge cases in `findDuplicates.ts`.

## 2. Targeted Implementation Plan

### Phase A: Core Logic Coverage (High Priority)
1.  **`src/lib/songs.ts`:** Implement tests for all database utility functions (`getAllSongs`, `getSongById`, `searchSongs`, `postNewSong`). These are the backbone of the application.
2.  **`src/utils/findDuplicates.ts`:** Add test cases for network failures, empty result sets, and error parsing.

### Phase B: API Route Coverage
1.  **Endpoints:** Implement tests for `song.ts`, `searchSongs.ts`, `login.ts`, and `newSong.ts`.
2.  **Method Coverage:** Ensure `POST`/`GET` methods and error handling (400, 401, 405, 500 status codes) are fully exercised.

### Phase C: Component Coverage
1.  **`Lyrics` Component:** Expand tests to verify state toggling (copy button, expand/collapse), and empty state rendering.
2.  **`Search` Component:** Test form submission, input handling, and the filtering logic.
3.  **`AddSongs` Component:** Test form submission validation and UI feedback.

## 3. Revised Action Plan

| Task | Priority | Target File |
| :--- | :--- | :--- |
| Mock `mongodb` and test all `lib/songs.ts` functions | High | `src/lib/__tests__/songs.test.ts` |
| Complete `findDuplicates` edge case tests | High | `src/utils/__tests__/findDuplicates.test.ts` |
| Add endpoint tests for `api/song.ts` and `api/newSong.ts` | Medium | `src/pages/api/__tests__/` |
| Expand `Lyrics` component interactivity tests | Medium | `src/components/__tests__/lyrics.test.tsx` |
| Implement tests for `Search` and `AddSongs` components | Medium | `src/components/__tests__/` |

## 4. Execution Loop
1. **Identify** the next untested branch or function.
2. **Write** a test case to exercise that path.
3. **Run** `npm run test -- --coverage` to verify the coverage increase.
4. **Repeat** until 70% coverage is met.
