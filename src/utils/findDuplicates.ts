import { searchSongs } from "../lib/songs";
import { Song } from "./models";

export async function findDuplicates(inputSong: string) {
  const response = await searchSongs(inputSong, 1.0);
  if (response.error) {
    throw new Error(response.error);
  }

  let songs = response.songs as Song[];

  if (songs.length > 5) {
    songs = songs.slice(0, 5); // Limit to 5 results
  }

  return songs;
}
