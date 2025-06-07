"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Document from "@tiptap/extension-document";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import React, { useState } from "react";

const Tiptap = ({
  handleSubmit,
}: {
  handleSubmit: (title: string, lyrics: string) => void;
}) => {
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Italic],
    editorProps: {
      attributes: {
        class: "w-full h-auto border rounded-md shadow-sm min-h-96 min-w-96",
      },
    },
    autofocus: true,
    content: `<p>Start writing your lyrics here...</p>`,
  });
  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-2xl mt-8 text-gray-800 font-sans w-full h-auto">
      <input
        type="text"
        placeholder="Title"
        className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => {
          const title = e.target.value;
          console.log("Title:", title);
          setTitle(title);
          // Here you can handle the title, e.g., save it to a database
        }}
      />
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              (editor.isActive("bold") ? "is-active " : "") +
              "p-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 shadow-sm hover:shadow-md active:shadow-lg active:bg-gray-400 active:text-gray-800 mr-2"
            }
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              (editor.isActive("italic") ? "is-active " : "") +
              "p-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 shadow-sm hover:shadow-md active:shadow-lg active:bg-gray-400 active:text-gray-800 ml-2"
            }
          >
            I
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="tiptap-editor" />
      <button
        onClick={() => {
          const content = editor.getHTML();
          console.log("Content:", content);
          handleSubmit(title, content);
          // Here you can handle the content, e.g., save it to a database
        }}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Content
      </button>
    </div>
  );
};

export default Tiptap;
