"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { GetAllTitles, GetSongById, SearchSongs } from "../utils/apiCalls";
import { Song } from "../utils/models";
import Search from "./search";

export default function Home() {
	// TODO maybe convert songMap to a ref
	const [songMap, setSongMap] = useState(new Map<string, Song>());
	const [filteredSongs, setFilteredSongs] = useState(new Map<string, Song>());

	const updateSongMap = (key: string, value: Song) => {
		setSongMap((map) => new Map(map.set(key, value)));
	};

	const getSongById = async (songId: string) => {
		const data = await GetSongById(songId);
		return data;
	};

	const searchSongs = async (key: string) => {
		const data = await SearchSongs(key);
		return data;
	};

	// TODO remove when doing actual function calls
	getSongById("675eb05ce5801142d59ef8e6");
	searchSongs("ALL THE EARTH WILL SING YOUR PRAISES");

	useEffect(() => {
		(async () => {
			const localTitleList = await GetAllTitles();
			localTitleList.forEach((value, index) => {
				// TODO: change so setSongMap is not called over every iteration
				updateSongMap(value.id, {
					title: value.title,
					lyrics: value.lyrics,
					number: index + 1,
				});
			});
		})();
		setFilteredSongs(songMap);
	}, [songMap]);

	// const test = await GetSongById("675eb05ce5801142d59ef8e6")
	// const test = await SearchSongs("EVERY MOVE I MAKE")

	// console.log("Test: ", test)

	return (
		<>
			<Search setFilteredSongs={setFilteredSongs} allSongs={songMap}></Search>
			<h1>Highway Lyrics (Work in Progress)</h1>
			<ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
				{Array.from(filteredSongs.entries()).map((entry) => {
					const [key, value] = entry;
					return (
						<p key={key} className="mb-2">
							{value.number + ". " + value.title}
						</p>
					);
				})}
			</ol>
		</>
	);
}
