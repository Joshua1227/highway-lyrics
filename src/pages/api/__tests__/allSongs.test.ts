import { createMocks } from "node-mocks-http";
import handler from "../allSongs";
import * as songs from "@/lib/songs";
import { vi } from 'vitest';
import { NextApiRequest, NextApiResponse } from "next";

vi.mock("@/lib/songs", () => ({
  getAllSongs: vi.fn(),
}));

describe("/api/allSongs", () => {
  test("should return all songs on GET", async () => {
    const mockSongs = [{ _id: "1", title: "Song A", lyrics: "Lyrics A" }];
    (songs.getAllSongs as unknown as jest.Mock).mockResolvedValue({ songs: mockSongs });

    const { req, res } = createMocks({ method: "GET" });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ songs: mockSongs });
  });

  test("should return 405 on POST", async () => {
    const { req, res } = createMocks({ method: "POST" });
    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(res._getStatusCode()).toBe(405);
  });
});
