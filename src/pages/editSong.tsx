import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "@/app/globals.css";
import SongInputForm from "@/components/songInputForm";

export default function EditSong() {
  const router = useRouter();
  const { songId } = router.query;

  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady || !songId) return;

    (async () => {
      try {
        const response = await fetch(`/api/song?songId=${encodeURIComponent(songId as string)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch song details");
        }
        const data = await response.json();
        if (data.song) {
          setTitle(data.song.title || "");
          setLyrics(data.song.lyrics || "");
        } else {
          throw new Error("Song not found");
        }
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An error occurred while loading the song.");
      } finally {
        setLoading(false);
      }
    })();
  }, [router.isReady, songId]);

  const handleFormSubmit = async (updatedTitle: string, updatedLyrics: string) => {
    if (!songId) return;
    try {
      const response = await fetch(`/api/song`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songId: songId as string,
          title: updatedTitle,
          lyrics: updatedLyrics,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update song");
      }

      const data = await response.json();
      if (data.success) {
        alert("Song updated successfully");
        router.push("/");
      } else {
        throw new Error(data.error || "Failed to update song");
      }
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg text-gray-700">Loading song details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-4 sm:p-8 bg-gray-100 text-gray-800 font-sans flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Edit Song</h1>
      <p className="mb-4">Modify the song details below:</p>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full h-auto">
        <SongInputForm
          handleFormSubmit={handleFormSubmit}
          setLyrics={setLyrics}
          setTitle={setTitle}
          title={title}
          lyrics={lyrics}
          submitButtonText="Save Changes"
        />
      </div>
    </div>
  );
}
