import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/newSong";
import * as songs from "@/lib/songs";
import { vi } from "vitest";
import { NextApiRequest, NextApiResponse } from "next";

vi.mock("@/lib/songs", () => ({
  postNewSong: vi.fn(),
}));

describe("/api/newSong", () => {
  test("should create a new song on POST", async () => {
    const mockTitle = "New Song";
    const mockLyrics = "Some lyrics";
    (songs.postNewSong as unknown as jest.Mock).mockResolvedValue({ success: true, insertedId: "testId" });

    const { req, res } = createMocks({
      method: "POST",
      body: { title: mockTitle, lyrics: mockLyrics },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ success: true, insertedId: "testId" });
  });

  test("should return 400 if title is missing", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { lyrics: "No title" },
    });

    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(res._getStatusCode()).toBe(400);
  });
});
