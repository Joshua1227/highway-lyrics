import { UniqueSong } from "@/utils/models";
import { GetStaticProps } from "next";
import clientPromise from "../lib/mongodb";

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

export const getStaticProps: GetStaticProps<SongList> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const songs = await db
      .collection("lyrics")
      .find({})
      .sort({ title: 1 })
      .toArray();

    return {
      props: { songs: JSON.parse(JSON.stringify(songs)) },
    };
  } catch (e) {
    console.error(e);

    return {
      props: { songs: [] },
    };
  }
};

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
