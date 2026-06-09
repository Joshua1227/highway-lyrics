import { createMocks } from "node-mocks-http";
import handler from "../song";
import * as songs from "@/lib/songs";
import { vi } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";

vi.mock("@/lib/songs", () => ({
  getSongById: vi.fn(),
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
});
