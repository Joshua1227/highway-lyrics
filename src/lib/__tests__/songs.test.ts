import { getAllSongs, getSongById, searchSongs, postNewSong, updateSong } from "../songs";
import { vi } from 'vitest';

// Mock the mongodb client promise
vi.mock("../mongodb", () => ({
  __esModule: true,
  default: Promise.resolve({
    db: vi.fn().mockReturnValue({
      collection: vi.fn().mockReturnValue({
        find: vi.fn().mockReturnThis(),
        map: vi.fn().mockReturnThis(),
        sort: vi.fn().mockReturnThis(),
        toArray: vi.fn().mockResolvedValue([
          { _id: "000000000000000000000001", title: "Song A", lyrics: "Lyrics A" },
          { _id: "000000000000000000000002", title: "Song B", lyrics: "Lyrics B" },
        ]),
        findOne: vi.fn().mockResolvedValue({ _id: "000000000000000000000001", title: "Test Song", lyrics: "Test Lyrics" }),
        aggregate: vi.fn().mockReturnThis(),
        insertOne: vi.fn().mockResolvedValue({ insertedId: "000000000000000000000003" }),
        updateOne: vi.fn().mockResolvedValue({ matchedCount: 1, modifiedCount: 1 }),
      }),
    }),
  }),
}));

describe("songs.ts unit tests", () => {
  test("getAllSongs should fetch all songs", async () => {
    const result = await getAllSongs();
    expect(result).toHaveProperty("songs");
    expect(result.songs?.length).toBe(2);
    expect(result.songs?.[0].title).toBe("Song A");
  });

  test("getSongById should fetch a song by ID", async () => {
    const result = await getSongById("000000000000000000000001");
    expect(result.song?.title).toBe("Test Song");
  });

  test("searchSongs should fetch matching songs", async () => {
    const result = await searchSongs("one", 0.5);
    expect(result).toHaveProperty("songs");
  });

  test("postNewSong should insert a new song", async () => {
    const result = await postNewSong("New Title", "New Lyrics");
    expect(result.success).toBe(true);
    expect(result.insertedId).toBe("000000000000000000000003");
  });

  test("updateSong should update an existing song", async () => {
    const result = await updateSong("000000000000000000000001", "Updated Title", "Updated Lyrics");
    expect(result.success).toBe(true);
    expect(result.matchedCount).toBe(1);
    expect(result.modifiedCount).toBe(1);
  });
});
