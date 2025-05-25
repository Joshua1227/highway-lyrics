"use client";
// import Image from "next/image";
import { useEffect, useState, MouseEvent } from "react";
import { Song, UniqueSong } from "../utils/models";
import Search from "./search";
import Lyrics from "./lyrics";

export default function Home() {
  // TODO maybe convert songMap to a ref
  // TODO let filtered songs just be a list of song Ids instead of holding duplicate information
  const [songMap, setSongMap] = useState(new Map<string, Song>());
  const [filteredSongs, setFilteredSongs] = useState(new Map<string, Song>());
  const [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/allSongs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const songs = (await response.json()) as UniqueSong[];
      // const localTitleList = await GetAllTitles();
      const localSongMap = new Map<string, Song>();
      songs.forEach((value, index) => {
        localSongMap.set(value._id, {
          title: value.title,
          lyrics: "",
          number: index + 1,
        });
      });
      setSongMap(localSongMap);
      setFilteredSongs(localSongMap);
    })();
  }, []);

  // const test = await GetSongById("675eb05ce5801142d59ef8e6")
  // const test = await SearchSongs("EVERY MOVE I MAKE")

  const updateCurrentSong = (e: MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).value) {
      const songId = (e.target as HTMLButtonElement).value;
      if (!songMap.get(songId)?.lyrics) {
        (async () => {
          const response = await fetch(`/api/song/${songId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const song = (await response.json()) as Song;
          const updatedSong = {
            ...songMap.get(songId),
            lyrics: song.lyrics,
            number: song.number,
            title: song.title,
          };
          setSongMap((prev) => new Map(prev).set(songId, updatedSong));
          setFilteredSongs((prev) => new Map(prev).set(songId, updatedSong));
        })();
      }
      setCurrentSong(songId);
    }
  };

  return (
    <>
      <Search setFilteredSongs={setFilteredSongs} allSongs={songMap}></Search>
      <h1>Highway Lyrics (Work in Progress)</h1>
      <div className="grid grid-cols-2 gap-2">
        <ol className="list-inside list-none text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          {Array.from(filteredSongs.entries()).map((entry) => {
            const [key, value] = entry;
            return (
              <li key={key}>
                <button
                  className="mb-2"
                  value={key}
                  onClick={updateCurrentSong}
                >
                  {value.number + ". " + value.title}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <Lyrics id={currentSong} filteredSongs={filteredSongs} />
    </>
  );
}
