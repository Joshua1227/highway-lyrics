// import Image from "next/image";
import GetAllTitles from "../utils/apiCalls"

export default async function Home() {

  const data = await GetAllTitles()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Highway Lyrics (Work in Progress)</h1>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {data.map((titleItem) => {
          return (<li key={titleItem.id} className="mb-2">{titleItem.title}</li>)
        })}
        </ol>
      </main>
    </div>
  );
}
