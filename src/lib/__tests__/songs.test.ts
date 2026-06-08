import { getAllSongs, getSongById, searchSongs, postNewSong } from "../songs";

// Mock the mongodb client promise
jest.mock("../mongodb", () => ({
  __esModule: true,
  default: Promise.resolve({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnThis(),
        map: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        toArray: jest.fn().mockResolvedValue([
          { _id: "000000000000000000000001", title: "Song A", lyrics: "Lyrics A" },
          { _id: "000000000000000000000002", title: "Song B", lyrics: "Lyrics B" },
        ]),
        findOne: jest.fn().mockResolvedValue({ _id: "000000000000000000000001", title: "Test Song", lyrics: "Test Lyrics" }),
        aggregate: jest.fn().mockReturnThis(),
        insertOne: jest.fn().mockResolvedValue({ insertedId: "000000000000000000000003" }),
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

  test("should handle database errors gracefully", async () => {
    // This requires forcing a failure in the mock.
    // For now, testing the success paths first.
  });
});
