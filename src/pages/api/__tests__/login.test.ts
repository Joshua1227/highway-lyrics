import { createMocks } from "node-mocks-http";
import handler from "../login";
import { NextApiRequest, NextApiResponse } from "next";

jest.mock("@/lib/session", () => ({
  encrypt: jest.fn(),
}));

describe("/api/login", () => {
  test("should return 405 if method is not POST", async () => {
    const { req, res } = createMocks({ method: "GET" });
    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(res._getStatusCode()).toBe(405);
  });

  test("should return 400 if credentials missing", async () => {
    const { req, res } = createMocks({ method: "POST", body: {} });
    await handler(req as unknown as NextApiRequest, res as unknown as NextApiResponse);
    expect(res._getStatusCode()).toBe(400);
  });
});
