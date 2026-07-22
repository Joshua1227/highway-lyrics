import { NextApiRequest, NextApiResponse } from "next";
import { getSongById, updateSong } from "@/lib/songs";

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
        return res.status(404).json({ error: "Song not found" });
      }
      return res.status(200).json({ song });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ error: errorMessage });
    }
  }

  if (req.method === "PUT") {
    console.log("Received PUT request for song");
    const { songId, title, lyrics } = req.body;
    if (!songId || !title || !lyrics) {
      return res.status(400).json({ error: "Song ID, Title, and Lyrics are required" });
    }
    try {
      const { success, error } = await updateSong(songId, title, lyrics);
      if (error) {
        throw new Error(error);
      }
      return res.status(200).json({ success });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ error: errorMessage });
    }
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
export default handler;
