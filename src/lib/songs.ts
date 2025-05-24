import { Collection, Db, MongoClient } from "mongodb";
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
      .sort({ title: -1 })
      .toArray();
    return { songs: allSongs };
  } catch (error) {
    console.error("Error fetching songs:", error);
    return { error: "Failed to fetch songs" };
  }
}
