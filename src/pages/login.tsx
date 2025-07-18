import router from "next/router";
import React from "react";
import "@/app/globals.css";

export default function Login() {
  const questions = {
    "What is the name of the garden where Jesus prayed before his crucifixion?":
      "Gethsemane",
    "What is the name of the river where Jesus was baptized?": "Jordan",
    "What is the name of the mountain where Moses received the Ten Commandments?":
      "Sinai",
    "What is the name of the place where Jesus turned water into wine?": "Cana",
    "What is the name of the place where Jesus was crucified?": "Golgotha",
    "What was the name of the man who fell asleep and fell out of a window while Paul was preaching?":
      "Eutychus",
    "What specific type of bird brought food to Elijah by the Kerith Ravine?":
      "Raven",
    "What was the name of the elderly prophetess who recognized Jesus in the temple as a baby?":
      "Anna",
  };
  type QuestionKey = keyof typeof questions;
  const questionKeys = Object.keys(questions) as QuestionKey[];
  const randomQuestion =
    questionKeys[Math.floor(Math.random() * questionKeys.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-gray-800 font-sans w-full h-auto">
      <h1 className="text-2xl font-bold mb-4">Authenticate</h1>
      <p className="text-gray-600 mb-6">Question: {randomQuestion}</p>
      <input
        name="answer"
        id="answer"
        type="text"
        placeholder="Your answer"
        className="mb-4 px-4 py-2 border border-gray-300 rounded w-64"
      ></input>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          // Logic for authentication goes here
          const answer = (document.getElementById("answer") as HTMLInputElement)
            .value;
          (async () => {
            const response = await fetch("/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId: "testUser", password: answer }),
            });
            if (!response.ok) {
              console.error(`HTTP error! status: ${response.status}`);
              router.push("/");
            }
            const data = await response.json();
            if (data.success) {
              // Authentication successful
              alert("Authentication successful!");
              router.push("/addSongs");
            } else {
              // Authentication failed
              alert("Authentication failed. Please try again.");
              router.push("/");
            }
          })();
        }}
      >
        Authenticate and submit answer
      </button>
    </div>
  );
}
