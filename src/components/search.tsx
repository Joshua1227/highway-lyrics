import { Song, UniqueSong } from "@/utils/models";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

export default function Search({
  setFilteredSongs,
  allSongs,
}: {
  setFilteredSongs: Dispatch<SetStateAction<Map<string, Song>>>;
  allSongs: Map<string, Song>;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const searchSongs = async (key: string) => {
    const response = await fetch(
      `/api/searchSongs?key=${encodeURIComponent(key)}`
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

  const updateFilteredSongs = (e: FormEvent<HTMLFormElement>) => {
    const event = e;
    event.preventDefault();

    if (searchQuery) {
      (async () => {
        const foundSongs = await searchSongs(searchQuery);
        const localFilteredSongs = new Map<string, Song>();

        foundSongs.forEach((value) => {
          const originalSong = allSongs.get(value._id) ?? { number: 0 };
          const originalSongNumber = originalSong?.number;

          localFilteredSongs.set(value._id, {
            title: value.title,
            number: originalSongNumber,
            lyrics: value.lyrics,
          });
        });
        setFilteredSongs(localFilteredSongs);
      })();
    } else {
      setFilteredSongs(allSongs);
    }
  };

  return (
    <search>
      <form onSubmit={updateFilteredSongs}>
        <input
          className="rounded-md shadow-sm"
          type="text"
          name="seachSongs"
          id="searchSongs"
          placeholder="Search Songs"
          onChange={handleInputChange}
        ></input>
        <button
          type="submit"
          className="mx-3 bg-amber-300 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Search
        </button>
      </form>
    </search>
  );
}
