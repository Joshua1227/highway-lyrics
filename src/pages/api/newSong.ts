import { NextApiRequest, NextApiResponse } from "next";
import { postNewSong } from "@/lib/songs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("Received POST request for song", req.body);
    const title = req.body.title;
    const lyrics = req.body.lyrics;
    if (!title || !lyrics) {
      return res.status(400).json({ error: "Song Content is required" });
    }
    try {
      const { success, insertedId, error } = await postNewSong(title, lyrics);
      if (error) {
        throw new Error(error);
      }
      return res.status(200).json({ success, insertedId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return res.status(500).json({ error: errorMessage });
    }
  }
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};
export default handler;
