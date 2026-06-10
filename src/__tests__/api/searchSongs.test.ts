import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/searchSongs";
import * as songs from "@/lib/songs";
import { vi } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";

vi.mock("@/lib/songs", () => ({
  searchSongs: vi.fn(),
}));

describe("/api/searchSongs", () => {
  test("should return search results on GET", async () => {
    const mockSongs = [{ _id: "1", title: "Test Song", lyrics: "Lyrics" }];
    (songs.searchSongs as unknown as jest.Mock).mockResolvedValue({ songs: mockSongs });

    const { req, res } = createMocks({
      method: "GET",
      query: { key: "test" },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ songs: mockSongs });
  });

  test("should return 400 if key is missing", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {},
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(res._getStatusCode()).toBe(400);
  });
});
