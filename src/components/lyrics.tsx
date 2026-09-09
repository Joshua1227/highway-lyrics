import { Song } from "@/utils/models";
import { useState } from "react";
import { useRouter } from "next/router";
// import ViewEditor from "./viewEditor";

interface LyricsProps {
  id: string;
  filteredSongs: Map<string, Song>;
  isLyricsExpanded?: boolean;
  toggleLyricsExpansion?: () => void;
}

export default function Lyrics({
  id,
  filteredSongs,
  isLyricsExpanded = false,
  toggleLyricsExpansion,
}: LyricsProps) {
  const router = useRouter();
  const [copyClick, setCopyClick] = useState(false);

  if (!id) {
    return <p>No song selected</p>;
  }
  if (!filteredSongs.get(id)?.lyrics) {
    return <p>Loading lyrics...</p>;
  }

  let songTitle = filteredSongs.get(id)?.title;
  if (!songTitle) {
    songTitle = "Unknown Title";
  }

  const songLyrics = filteredSongs.get(id)?.lyrics;

  const songText = `${songTitle}\n\n${String(songLyrics)
    .trim()
    .replace(/\\n+/g, "\n")}`;

  const handleCopyClick = () => {
    setCopyClick(true);
    navigator.clipboard.writeText(songText.trim()).then(() => {
      setTimeout(() => {
        setCopyClick(false);
      }, 2000);
    });
  };

  // Icon for expanding
  const expandIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0 0h4.5m-4.5 0L9 3.75M3.75 3.75v4.5m0 0h4.5m-4.5 0L9 9M3.75 7.5v4.5m0 0h4.5m-4.5 0L9 15M3.75 11.25v4.5m0 0h4.5m-4.5 0L9 21m-3.75-3.75v4.5m0 0h4.5m-4.5 0L9 21"
      />
    </svg>
  );

  // Icon for collapsing
  const collapseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0 1 1.123-.08m-1.947 3.708a7.5 7.5 0 0 0 3.707 3.707M8.25 12.5a1.5 1.5 0 0 1 1.5-1.5h9c.75 0 1.5.75 1.5 1.5v9.75c0 .75-.75 1.5-1.5 1.5h-9a1.5 1.5 0 0 1-1.5-1.5v-9.75Z"
      />
    </svg>
  );

  const currentIcon = isLyricsExpanded ? collapseIcon : expandIcon;

  const baseCopyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
      />
    </svg>
  );

  const clickedCopyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
      />
    </svg>
  );

  const copyIcon = copyClick ? clickedCopyIcon : baseCopyIcon;

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.83 18.982a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );

  return (
    <div className="justify-between items-center p-4 max-w-2xl mt-8 text-white font-sans w-full h-auto">
      <div className="flex items-center">
        {toggleLyricsExpansion && (
          <button
            className="transition hover:scale-110 text-gray-700 hover:text-gray-900 transform hover:translate-x-1 hover:translate-y-1 mr-2"
            title={isLyricsExpanded ? "Collapse Lyrics" : "Expand Lyrics"}
            onClick={toggleLyricsExpansion}
          >
            {currentIcon}
          </button>
        )}
        <button
          className="transition hover:scale-110 text-gray-700 hover:text-gray-900 transform hover:translate-x-1 hover:translate-y-1"
          title="Copy Lyrics"
          onClick={handleCopyClick}
        >
          {copyIcon}
        </button>
        <button
          className="transition hover:scale-110 text-gray-700 hover:text-gray-900 transform hover:translate-x-1 hover:translate-y-1 ml-2"
          title="Edit Song"
          onClick={() =>
            router.push(`/editSong?songId=${encodeURIComponent(id)}`)
          }
        >
          {editIcon}
        </button>
      </div>
      <div className="text-lg whitespace-pre-wrap break-words p-4 font-sans w-full h-auto ">
        {songText.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}
