import { useState } from "react";
import React from "react";
import "@/app/globals.css";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-gray-800 font-sans w-full h-auto">
      <h1 className="text-2xl font-bold mb-4">Authenticate</h1>
      <p className="text-gray-600 mb-6">Please enter the password to continue.</p>
      
      {error && (
        <p id="error-message" className="text-red-500 mb-4 font-semibold text-sm">
          {error}
        </p>
      )}

      <input
        name="answer"
        id="answer"
        type="password"
        placeholder="Password"
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></input>
      
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={() => {
          setError(null);
          const answer = (document.getElementById("answer") as HTMLInputElement).value;
          
          (async () => {
            try {
              const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: "testUser", password: answer }),
              });
              
              console.log("Login response status:", response.status);
              const data = await response.json();
              console.log("Login response data:", data);
              
              if (response.ok && data.success) {
                const searchParams = new URLSearchParams(window.location.search);
                const redirectTo = searchParams.get("redirectTo") || "/addSongs";
                window.location.href = redirectTo;
              } else {
                setError(data.message || "Incorrect password");
              }
            } catch (err) {
              console.error(err);
              setError("An unexpected error occurred. Please try again.");
            }
          })();
        }}
      >
        Authenticate and submit answer
      </button>
    </div>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}
