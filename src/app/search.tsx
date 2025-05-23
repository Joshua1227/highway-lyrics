import { SearchSongs } from "@/utils/apiCalls";
import { Song } from "@/utils/models";
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
    const data = await SearchSongs(key);
    return data;
  };

  const updateFilteredSongs = (e: FormEvent<HTMLFormElement>) => {
    const event = e;
    event.preventDefault();

    if (searchQuery) {
      (async (event) => {
        console.log(event);

        console.log("searchQuery : \n", searchQuery);
        const foundSongs = await searchSongs(searchQuery);
        console.log("foundSongs : \n", foundSongs);
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
        console.log("localFilteredSongs : \n", localFilteredSongs);
      })();
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
        <button type="submit">Search</button>
      </form>
    </search>
  );
}
