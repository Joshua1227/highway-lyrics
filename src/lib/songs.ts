import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "./mongodb";

let db: Db;
let client: MongoClient;
let songs: Collection<Record<string, unknown>>;

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
    const query = { _id: new ObjectId(songId) };
    const songWithLyrics = await songs.findOne(query);
    return { song: songWithLyrics };
  } catch (error) {
    console.error("Error fetching song:", error);
    return { error: "Failed to fetch song" };
  }
}

export async function searchSongs(searchKey: string, minSimilarity = 0.5) {
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
        { $match: { score: { $gte: minSimilarity } } },
        { $sort: { score: { $meta: "textScore" } } },
      ])
      .toArray();
    return { songs: matchingSongs };
  } catch (error) {
    console.error("Error searching songs:", error);
    return { error: "Failed to search songs" };
  }
}

export async function postNewSong(title: string, lyrics: string) {
  try {
    if (!songs) {
      await init();
    }
    const newSong = {
      title,
      lyrics,
      createdAt: new Date(),
      updatedAt: new Date(),
      addedby: "frontend User",
      approvedby: "bo auth",
    };
    const result = await songs.insertOne(newSong);
    return { success: true, insertedId: result.insertedId.toString() };
  } catch (error) {
    console.error("Error posting new song:", error);
    return { success: false, error: "Failed to post new song" };
  }
}
