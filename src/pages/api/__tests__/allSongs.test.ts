import { createMocks } from "node-mocks-http";
import handler from "../allSongs";
import * as songs from "@/lib/songs";

jest.mock("@/lib/songs", () => ({
  getAllSongs: jest.fn(),
}));

describe("/api/allSongs", () => {
  test("should return all songs on GET", async () => {
    const mockSongs = [{ _id: "1", title: "Song A", lyrics: "Lyrics A" }];
    (songs.getAllSongs as jest.Mock).mockResolvedValue({ songs: mockSongs });

    const { req, res } = createMocks({ method: "GET" });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ songs: mockSongs });
  });

  test("should return 405 on POST", async () => {
    const { req, res } = createMocks({ method: "POST" });
    await handler(req as any, res as any);
    expect(res._getStatusCode()).toBe(405);
  });
});
