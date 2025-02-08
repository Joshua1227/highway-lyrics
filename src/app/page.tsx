"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { GetAllTitles, GetSongById, SearchSongs } from "../utils/apiCalls";
import { Song } from "../utils/models";

export default function Home() {
	// TODO maybe convert mapState to a ref
	const [songMap, setSongMap] = useState(new Map<string, Song>());

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
			localTitleList.forEach((value) => {
				updateSongMap(value.id, { title: value.title, lyrics: value.lyrics });
			});
		})();
	}, []);

	// const test = await GetSongById("675eb05ce5801142d59ef8e6")
	// const test = await SearchSongs("EVERY MOVE I MAKE")

	// console.log("Test: ", test)

	return (
		<>
			<h1>Highway Lyrics (Work in Progress)</h1>
			<ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
				{Array.from(songMap.entries()).map((entry) => {
					const [key, value] = entry;
					return (
						<li key={key} className="mb-2">
							{value.title}
						</li>
					);
				})}
			</ol>
		</>
	);
}
