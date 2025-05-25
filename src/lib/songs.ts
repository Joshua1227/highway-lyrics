import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "./mongodb";

let db: Db;
let client: MongoClient;
let songs: Collection<Document>;

async function init() {
  if (db) {
    return;
  }
  try {
    client = await clientPromise;
    db = client.db("Highway");
    songs = db.collection("lyrics");
  } catch (e) {
    console.error(e);
    throw new Error("Failed to connect to the database");
  }
}

(async () => {
  await init();
  console.log("Connected to the database");
})();

export async function getAllSongs() {
  try {
    if (!songs) {
      await init();
    }
    const allSongs = await songs
      .find({})
      .map((song) => ({ ...song, _id: song._id.toString() }))
      .sort({ title: 1 })
      .toArray();
    return { songs: allSongs };
  } catch (error) {
    console.error("Error fetching songs:", error);
    return { error: "Failed to fetch songs" };
  }
}

export async function getSongById(songId: string) {
  try {
    if (!songs) {
      await init();
    }
    console.log("Fetching song with ID:", songId);
    const query = { _id: new ObjectId(songId) };
    const songWithLyrics = await songs.findOne(query);
    return { song: songWithLyrics };
  } catch (error) {
    console.error("Error fetching song:", error);
    return { error: "Failed to fetch song" };
  }
}

export async function searchSongs(searchKey: string) {
  try {
    if (!songs) {
      await init();
    }
    const matchingSongs = await songs
      .aggregate([
        { $match: { $text: { $search: searchKey } } },
        {
          $addFields: {
            score: { $meta: "textScore" },
          },
        },
        { $match: { score: { $gte: 0.5 } } },
        { $sort: { score: { $meta: "textScore" } } },
      ])
      .toArray();
    return { songs: matchingSongs };
  } catch (error) {
    console.error("Error searching songs:", error);
    return { error: "Failed to search songs" };
  }
}
