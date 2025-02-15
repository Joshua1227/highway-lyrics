import { SearchSongs } from "@/utils/apiCalls";
import { Song } from "@/utils/models";
import { Dispatch, FormEvent, SetStateAction } from "react";

export default function Search({
	setFilteredSongs,
	allSongs,
}: {
	setFilteredSongs: Dispatch<SetStateAction<Map<string, Song>>>;
	allSongs: Map<string, Song>;
}) {
	const searchSongs = async (key: string) => {
		const data = await SearchSongs(key);
		return data;
	};

	const updateFilteredSongs = (e: FormEvent<HTMLFormElement>) => {
		const event = e;
		console.log(event);
		(async (e) => {
			console.log(e);
			console.log(event);

			const foundSongs = await searchSongs("TEST");

			const localFilteredSongs = new Map<string, Song>();

			foundSongs.forEach((value) => {
				const originalSong = allSongs.get(value.id) ?? { number: 0 };
				const originalSongNumber = originalSong?.number;

				localFilteredSongs.set(value.id, {
					title: value.title,
					number: originalSongNumber,
					lyrics: value.lyrics,
				});
			});
			setFilteredSongs(localFilteredSongs);
		})();
	};

	return (
		<search>
			<form onSubmit={updateFilteredSongs}>
				<input
					name="seachSongs"
					id="searchSongs"
					placeholder="Search Songs"
				></input>
			</form>
		</search>
	);
}
