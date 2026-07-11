import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { encrypt } from "@/lib/session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  // Server-side validation: Password must match process.env.PASSWORD exactly (case-sensitive)
  if (password !== process.env.PASSWORD) {
    return res.status(401).json({ message: "Incorrect password", success: false });
  }

  const sessionData = JSON.stringify({ userId, password });
  const encryptedSessionData = await encrypt(sessionData);

  const cookie = serialize("highway-session", encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Successfully set cookie!", success: true });
}
