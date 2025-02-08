"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { GetAllTitles, GetSongById, SearchSongs } from "../utils/apiCalls";
import { UniqueSong } from "../utils/models";

export default function Home() {
	// TODO maybe convert titleList to a ref
	const [titleList, setTitleList] = useState<UniqueSong[]>([]);

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
			setTitleList(localTitleList);
		})();
	}, []);

	// const test = await GetSongById("675eb05ce5801142d59ef8e6")
	// const test = await SearchSongs("EVERY MOVE I MAKE")

	// console.log("Test: ", test)

	return (
		<>
			<h1>Highway Lyrics (Work in Progress)</h1>
			<ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
				{titleList.map((titleItem) => {
					return (
						<li key={titleItem.id} className="mb-2">
							{titleItem.title}
						</li>
					);
				})}
			</ol>
		</>
	);
}
