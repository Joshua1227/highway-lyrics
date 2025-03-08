import { Song } from "@/utils/models";

export default function Lyrics({
	id,
	filteredSongs,
}: {
	id: string;
	filteredSongs: Map<string, Song>;
}) {
	return (
		<p>
			{filteredSongs.get(id)?.title}
			{filteredSongs.get(id)?.lyrics}
		</p>
	);
}
