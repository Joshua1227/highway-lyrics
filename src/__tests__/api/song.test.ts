import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/song";
import * as songs from "@/lib/songs";
import { vi } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";

vi.mock("@/lib/songs", () => ({
  getSongById: vi.fn(),
  updateSong: vi.fn(),
}));

describe("/api/song", () => {
  test("should return a song on GET", async () => {
    const mockSong = { _id: "1", title: "Test Song", lyrics: "Lyrics" };
    (songs.getSongById as unknown as jest.Mock).mockResolvedValue({ song: mockSong });

    const { req, res } = createMocks({
      method: "GET",
      query: { songId: "1" },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ song: mockSong });
  });

  test("should return 404 if song not found", async () => {
    (songs.getSongById as unknown as jest.Mock).mockResolvedValue({ song: null, error: "Not Found" });

    const { req, res } = createMocks({
      method: "GET",
      query: { songId: "1" },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(res._getStatusCode()).toBe(404);
  });

  test("should update a song and return success on PUT", async () => {
    (songs.updateSong as unknown as jest.Mock).mockResolvedValue({ success: true });

    const { req, res } = createMocks({
      method: "PUT",
      body: {
        songId: "1",
        title: "Updated Title",
        lyrics: "Updated Lyrics",
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ success: true });
    expect(songs.updateSong).toHaveBeenCalledWith("1", "Updated Title", "Updated Lyrics");
  });

  test("should return 400 on PUT if missing parameters", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        songId: "1",
        title: "Updated Title",
        // missing lyrics
      },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toHaveProperty("error");
  });
});
