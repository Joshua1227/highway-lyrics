import { UniqueSong } from "@/utils/models";

interface SongList {
  songs: UniqueSong[];
}

export default function List({ songs }: SongList) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <ol className="list-inside list-none text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {songs.map((song) => (
          <li key={song._id.toString()}>
            <h2>{song.title}</h2>
          </li>
        ))}
      </ol>
    </div>
  );
}

// {Array.from(filteredSongs.entries()).map((entry) => {
//   const [key, value] = entry;
//   return (
//     <li key={key}>
//       <button className="mb-2" value={key} const onClick={updateCurrentSong}>
//         {value.number + ". " + value.title}
//       </button>
//     </li>
//   ),
// })}
