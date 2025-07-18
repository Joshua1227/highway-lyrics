import { UniqueSong } from "./models";

export async function findDuplicates(inputSong: string) {
  const searchSongs = async (key: string) => {
    const response = await fetch(
      `/api/searchSongs?key=${encodeURIComponent(
        key
      )}&minSimilarity=${encodeURIComponent("1.0")}`
    );
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      alert("Error fetching songs. Please try again later.");
      return [];
    }
    const responseJson = await response.json();
    if (responseJson.songs) {
      return responseJson.songs as UniqueSong[];
    }
    return [];
  };
  const response = await searchSongs(inputSong);

  let songs = response as UniqueSong[];

  if (songs.length > 5) {
    songs = songs.slice(0, 5); // Limit to 5 results
  }

  return songs;
}
