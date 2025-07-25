import { Song } from "@/utils/models";
import { useState } from "react";
// import ViewEditor from "./viewEditor";

export default function Lyrics({
  id,
  filteredSongs,
}: {
  id: string;
  filteredSongs: Map<string, Song>;
}) {
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

  return (
    <div className="justify-between items-center p-4 max-w-2xl mt-8 text-white font-sans w-full h-auto">
      <button
        className="transition-all transition-normal transition-transform hover:scale-110 text-gray-700 hover:text-gray-900 transform hover:translate-x-1 hover:translate-y-1"
        title="Copy Lyrics"
        onClick={handleCopyClick}
      >
        {copyIcon}
      </button>
      {/* <ViewEditor content={songText}></ViewEditor> */}
      <div className="text-lg font-mono whitespace-pre-wrap break-words p-4 font-sans w-full h-auto ">
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
