import React, { useEffect } from "react";
import "@/app/globals.css";
import { useRouter } from "next/router";
import { findDuplicates } from "@/utils/findDuplicates";
import { Song, UniqueSong } from "@/utils/models";
import Editor from "@/components/editor";
import Lyrics from "@/components/lyrics";

export default function AddSongs() {
  const router = useRouter();
  // TODO clean up states
  // TODO split code into different files
  const [showEditor, setShowEditor] = React.useState(false);
  const [showDuplicates, setShowDuplicates] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState("");
  const [duplicateSongMap, setDuplicateSongMap] = React.useState(
    new Map<string, Song>()
  );
  const [duplicateSongs, setDuplicateSongs] = React.useState<UniqueSong[]>([]);
  const [title, setTitle] = React.useState("");
  const [lyrics, setLyrics] = React.useState("");
  const submitSong = async (title: string, lyrics: string) => {
    const response = await fetch(`/api/newSong`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Or other content type
      },
      body: JSON.stringify({ title: title, lyrics: lyrics }), // Convert data to JSON string
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("Song Added successfully");
    router.push("/");
  };

  let content = <></>;
  const defaultContent = (
    <div className="flex space-x-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowEditor(true)}
      >
        Add Song
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={() => router.push("/")}
      >
        Cancel
      </button>
    </div>
  );

  const handleLyricsSubmit = (title: string, content: string) => {
    // Handle the submission of lyrics here
    console.log("Title:", title);
    setTitle(title);
    console.log("Content:", content);
    setLyrics(content);
    findDuplicates(title + "\n" + content).then((duplicates) => {
      if (duplicates.length > 0) {
        setDuplicateSongs(duplicates);
        console.log("Duplicate songs found:", duplicates);
        setShowDuplicates(true);
        setShowEditor(false);
      } else {
        // Proceed with saving the song
        console.log("No duplicates found. Proceeding with saving the song.");
        setShowEditor(false);
        submitSong(title, content);
      }
    });
  };

  useEffect(() => {
    // Check if the user is authenticated
    setDuplicateSongMap(() => {
      const localSongMap = new Map<string, Song>();
      duplicateSongs.forEach((song, index) => {
        localSongMap.set(song._id, {
          title: song.title,
          lyrics: song.lyrics,
          number: index + 1,
        });
      });
      return localSongMap;
    });
  }, [duplicateSongs, showDuplicates]);

  const updateCurrentSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((e.target as HTMLButtonElement).value) {
      const songId = (e.target as HTMLButtonElement).value;
      if (!duplicateSongMap.get(songId)?.lyrics) {
        (async () => {
          const response = await fetch(
            `/api/song?songId=${encodeURIComponent(songId)}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const responseSong = await response.json();
          if (responseSong.song) {
            const song = responseSong.song as Song;
            const originalSong = duplicateSongMap.get(songId);
            if (!originalSong) return;
            const updatedSong: Song = {
              title: originalSong.title,
              number: originalSong.number,
              lyrics: song.lyrics,
            };
            setDuplicateSongMap((prev) =>
              new Map(prev).set(songId, updatedSong)
            );
          }
        })();
      }
      setCurrentSong(songId);
    }
  };

  const editorContent = (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add a New Song</h2>
      <p className="mb-4">Please enter the song title and lyrics below:</p>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full h-auto">
        <Editor handleSubmit={handleLyricsSubmit} />
      </div>
    </div>
  );
  const duplicateCheckContent = (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Duplicate Songs Found</h2>
      <p className="mb-4">
        The following songs have similar lyrics. Please review them before
        proceeding:
      </p>
      <div className="grid grid-cols-2 gap-2">
        <ol className="bg-stone-300 list-inside list-none text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] overflow-y-auto h-[calc(100vh-8rem)] p-4 rounded-lg">
          {Array.from(duplicateSongMap.entries()).map((entry) => {
            const [key, value] = entry;
            return (
              <li key={key}>
                <button
                  className="mb-2"
                  value={key}
                  onClick={updateCurrentSong}
                >
                  {value.number + ". " + value.title}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="bg-slate-400 p-4 rounded-lg overflow-y-auto h-[calc(100vh-8rem)] text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-white">
          <Lyrics id={currentSong} filteredSongs={duplicateSongMap} />
        </div>
      </div>
      <button
        onClick={() => {
          submitSong(title, lyrics);
        }}
        className=""
      >
        Only Click after reviewing duplicate Songs
      </button>
    </div>
  );
  if (!showEditor && !showDuplicates) {
    content = defaultContent;
  } else if (showEditor) {
    content = editorContent;
  } else if (showDuplicates) {
    content = duplicateCheckContent;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Add Songs</h1>
      <p className="text-lg mb-8">This feature is coming soon!</p>
      {content}
      <p className="mt-4 text-sm text-gray-500">
        Note: This page is a placeholder. The functionality to add songs will be
        implemented soon.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        If you have any suggestions or want to contribute, please check out the
        issues page{" "}
        <a
          href="https://github.com/Joshua1227/highway-lyrics/issues"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}
