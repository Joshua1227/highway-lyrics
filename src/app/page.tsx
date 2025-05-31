"use client";
// import Image from "next/image";
import { useEffect, useState, MouseEvent } from "react";
import { Song, UniqueSong } from "../utils/models";
import Search from "./search";
import Lyrics from "./lyrics";
import Tiptap from "./components/editor";

export default function Home() {
  // TODO maybe convert songMap to a ref
  // TODO let filtered songs just be a list of song Ids instead of holding duplicate information
  const [songMap, setSongMap] = useState(new Map<string, Song>());
  const [filteredSongs, setFilteredSongs] = useState(new Map<string, Song>());
  const [currentSong, setCurrentSong] = useState("");
  const [addingSong, setAddingSong] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/allSongs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseSongs = await response.json();
      if (responseSongs.songs) {
        const localSongMap = new Map<string, Song>();

        (responseSongs.songs as UniqueSong[]).forEach((value, index) => {
          localSongMap.set(value._id, {
            title: value.title,
            lyrics: "",
            number: index + 1,
          });
        });
        setSongMap(localSongMap);
        setFilteredSongs(localSongMap);
      }
    })();
  }, []);

  // const test = await GetSongById("675eb05ce5801142d59ef8e6")
  // const test = await SearchSongs("EVERY MOVE I MAKE")

  const updateCurrentSong = (e: MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).value) {
      const songId = (e.target as HTMLButtonElement).value;
      if (!songMap.get(songId)?.lyrics) {
        (async () => {
          const response = await fetch(
            `/api/song?songId=${encodeURIComponent(songId)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseSong = await response.json();
          if (responseSong.song) {
            const song = responseSong.song as Song;
            const originalSong = songMap.get(songId);
            if (!originalSong) return;
            const updatedSong: Song = {
              title: originalSong.title,
              number: originalSong.number,
              lyrics: song.lyrics,
            };
            setFilteredSongs((prev) => new Map(prev).set(songId, updatedSong));
          }
        })();
      }
      setCurrentSong(songId);
    }
  };

  let sideContent = <Lyrics id={currentSong} filteredSongs={filteredSongs} />;

  if (addingSong) {
    sideContent = <Tiptap />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-800">
        <Search setFilteredSongs={setFilteredSongs} allSongs={songMap}></Search>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => {
            setAddingSong((prev) => !prev);
          }}
        >
          {addingSong ? "Cancel" : "Add Song"}
        </button>
      </div>
      <h1 className="text-2xl font-bold">Highway Lyrics(Work in Progress)</h1>
      <div className="grid grid-cols-2 gap-2">
        <ol className="bg-stone-300 list-inside list-none text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] overflow-y-auto h-[calc(100vh-8rem)] p-4 rounded-lg">
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
        <div className="bg-slate-400 p-4 rounded-lg overflow-y-auto h-[calc(100vh-8rem)] text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-white">
          {sideContent}
        </div>
      </div>
    </>
  );
}
