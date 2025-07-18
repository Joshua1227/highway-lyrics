import router from "next/router";

export default function SongInputForm({
  handleFormSubmit,
  setTitle,
  setLyrics,
  title,
  lyrics,
}: {
  handleFormSubmit: (title: string, content: string) => void;
  setTitle: (title: string) => void;
  setLyrics: (lyrics: string) => void;
  title: string;
  lyrics: string;
}) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      handleFormSubmit(title, lyrics);
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow-md max-w-2xl mt-8 text-gray-800 font-sans w-full h-auto"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <textarea
        placeholder="Lyrics"
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full h-40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Song
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-4 ml-2"
        onClick={() => router.push("/")}
      >
        Cancel
      </button>
    </form>
  );
}
