import { NextApiRequest, NextApiResponse } from "next";
import { getAllSongs } from "@/lib/songs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("Received GET request for all songs");
    try {
      const { songs, error } = await getAllSongs();
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
