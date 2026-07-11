import React from "react";
import { useRouter } from "next/router";
import FAQ from "@/components/faq";
import "@/app/globals.css";

export default function FAQPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-600">Highway Lyrics</h1>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Back to Home
        </button>
      </div>

      <FAQ />
    </div>
  );
}
