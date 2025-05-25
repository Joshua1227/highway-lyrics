import { NextApiRequest, NextApiResponse } from "next";
import { searchSongs } from "@/lib/songs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const searchKey = req.query.songId as string;
    if (!searchKey) {
      return res.status(400).json({ error: "Search Key is required" });
    }
    try {
      const { songs, error } = await searchSongs(searchKey);
      if (error) {
        throw new Error(error);
      }
      return res.status(200).json({ songs });
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
