import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Highlight from "@tiptap/extension-highlight";
import { EditorContent, useEditor } from "@tiptap/react";

export default function ViewEditor({ content }: { content: string }) {
  const editor = useEditor({
    content: content,
    extensions: [Document, Paragraph, Text, Highlight],
    editable: false,
  });

  return <EditorContent editor={editor} className="tiptap-editor" />;
}
