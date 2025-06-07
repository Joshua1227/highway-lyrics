import React from "react";
import { useRouter } from "next/navigation";

export default function AddSongs() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/addSongs/authenticate");
  };
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={handleClick}
    >
      Add Song
    </button>
  );
}
