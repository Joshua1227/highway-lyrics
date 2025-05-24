import { Song } from "@/utils/models";

export default function Lyrics({
	id,
	filteredSongs,
}: {
	id: string;
	filteredSongs: Map<string, Song>;
}) {
	return (
		<>
			<pre>
				{filteredSongs.get(id)?.title}
				<br></br>
				{filteredSongs.get(id)?.lyrics}
			</pre>
		</>
	);
}
