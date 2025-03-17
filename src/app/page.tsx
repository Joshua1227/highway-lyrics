"use client";
// import Image from "next/image";
import { useEffect, useState, MouseEvent } from "react";
import { GetAllTitles } from "../utils/apiCalls";
import { Song } from "../utils/models";
import Search from "./search";
import Lyrics from "./lyrics";

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
			const localTitleList = await GetAllTitles();
			const localSongMap = new Map<string, Song>();
			localTitleList.forEach((value, index) => {
				// TODO: change so setSongMap is not called over every iteration
				localSongMap.set(value.id, {
					title: value.title,
					lyrics: value.lyrics,
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
				<Lyrics id={currentSong} filteredSongs={filteredSongs} />
			</div>
		</>
	);
}
