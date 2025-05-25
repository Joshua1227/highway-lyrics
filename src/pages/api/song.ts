import { NextApiRequest, NextApiResponse } from "next";
import { getSongById } from "@/lib/songs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("Received GET request for song");
    const songId = req.query.songId as string;
    if (!songId) {
      return res.status(400).json({ error: "Song ID is required" });
    }
    try {
      const { song, error } = await getSongById(songId);
      if (error) {
        throw new Error(error);
      }
      return res.status(200).json({ song });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ error: errorMessage });
    }
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
export default handler;
