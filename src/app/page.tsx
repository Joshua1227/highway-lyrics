"use client";
// import Image from "next/image";
import { useEffect, useState, MouseEvent } from "react";
import { Song } from "../utils/models";
import Search from "./search";
import Lyrics from "./lyrics";
import { getAllSongs } from "@lib/songs";
// import { GetServerSideProps, GetStaticProps } from "next";

async function fetchAllSongs() {
  const { songs } = await getAllSongs();
  if (!songs) {
    throw new Error("Failed to fetch songs");
  }
  return songs;
}

export default function Home() {
  // TODO maybe convert songMap to a ref
  const [songMap, setSongMap] = useState(new Map<string, Song>());
  const [filteredSongs, setFilteredSongs] = useState(new Map<string, Song>());
  const [currentSong, setCurrentSong] = useState("");

  // *NOTE: Sample methods for api calls
  // const getSongById = async (songId: string) => {
  // 	const data = await GetSongById(songId);
  // 	return data;
  // };

  // const searchSongs = async (key: string) => {
  // 	const data = await SearchSongs(key);
  // 	return data;
  // };

  useEffect(() => {
    (async () => {
      const songs = await fetchAllSongs();
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
      setCurrentSong((e.target as HTMLButtonElement).value);
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

// export const getStaticProps: GetStaticProps<TitleItem> = async () => {
//   try {
//     const client = await clientPromise;

//     const db = client.db("Highway");

//     const lyrics = await db
//       .collection("lyrics")
//       .find({})
//       .sort({ title: -1 })
//       .toArray();

//     return {
//       props: { lyrics: JSON.parse(JSON.stringify(lyrics)) },
//     };
//   } catch (e) {
//     console.error(e);

//     return {
//       props: { title: [] },
//     };
//   }
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const client = await clientPromise;

//     const db = client.db("Highway");

//     const movies = await db
//       .collection("lyrics")
//       .find({})
//       .sort({ title: -1 })
//       .limit(20)
//       .toArray();

//     return {
//       props: { movies: JSON.parse(JSON.stringify(movies)) },
//     };
//   } catch (e) {
//     console.error(e);

//     return { props: { movies: [] } };
//   }
// };
