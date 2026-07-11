import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "When will you add more features?",
      answer:
        "I want to add the ability to edit existing songs, expand lyrics to full screen so they can be projected, and add the chords of songs to the page as a toggle-able option. But I'm only working part-time on this. You can get in touch with me if you want to help, or with your highway church leadership. If you know me, encouragement will help motivate me to continue working on this.",
    },
    {
      question: "How can someone get the password to add songs?",
      answer:
        "You can get in touch with your highway church leadership; at some point they will have the password.",
    },
    {
      question: "I'm an engineer, how can I help build this project?",
      answer:
        "This is the repository: https://github.com/Joshua1227/highway-lyrics . Feel free to have a look and raise a PR if you want to!",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-8 p-6 bg-white rounded-lg shadow-md font-sans text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 border-b pb-3">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-400"
            >
              <button
                className="w-full px-5 py-4 text-left font-semibold flex justify-between items-center bg-gray-50 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span className="text-lg text-gray-800">{item.question}</span>
                <span className="text-2xl text-blue-500 font-bold transition-transform duration-300">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="p-5 text-gray-600 bg-white leading-relaxed text-sm sm:text-base border-t border-gray-100">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
