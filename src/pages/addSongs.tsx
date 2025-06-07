import React from "react";
import "@/app/globals.css";

export default function AddSongs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Add Songs</h1>
      <p className="text-lg mb-8">This feature is coming soon!</p>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Song
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
      <button
        className="mt-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => (window.location.href = "/")}
      >
        Go Back to Home
      </button>
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
