export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-4 text-lg text-gray-700">Loading...</span>
    </div>
  );
}
// This component displays a loading spinner and a message while data is being fetched or processed.
