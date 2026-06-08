import { findDuplicates } from "../findDuplicates";

// Mock the global fetch
global.fetch = jest.fn();

describe("findDuplicates unit tests", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("should return an empty array if no duplicates are found", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ songs: [] }),
    });

    const duplicates = await findDuplicates("Title", "Lyrics");
    expect(duplicates).toEqual([]);
    expect(fetch).toHaveBeenCalled();
  });

  test("should return duplicates if found, limited to 5", async () => {
    const mockSongs = [
      { _id: "1", title: "S1", lyrics: "L1" },
      { _id: "2", title: "S2", lyrics: "L2" },
      { _id: "3", title: "S3", lyrics: "L3" },
      { _id: "4", title: "S4", lyrics: "L4" },
      { _id: "5", title: "S5", lyrics: "L5" },
      { _id: "6", title: "S6", lyrics: "L6" },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ songs: mockSongs }),
    });

    const duplicates = await findDuplicates("Title", "Lyrics");
    expect(duplicates.length).toBe(5);
    expect(duplicates).toEqual(mockSongs.slice(0, 5));
  });

  test("should handle API errors gracefully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });
    
    // Silence console error for the test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const duplicates = await findDuplicates("Title", "Lyrics");
    expect(duplicates).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  test("should handle network errors gracefully", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network down"));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(findDuplicates("Title", "Lyrics")).rejects.toThrow("Network down");
    
    consoleSpy.mockRestore();
  });
});
