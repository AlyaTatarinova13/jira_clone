"use client";
import React, { useState } from "react";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import CodeHighlightPlugin from "./plugins/code-highlight-plugin";
import { EditorComposer } from "./context/lexical-composer";
import { type EditorContentType } from "./editor";
import clsx from "clsx";

export const EditorPreview: React.FC<{
  action: "description" | "comment";
  content: EditorContentType;
  className?: string;
}> = ({ action, content, className }) => {
  const [jsonState] = useState<EditorContentType>(content);

  return (
    <EditorComposer readonly={true} jsonState={jsonState}>
      <div className="relative w-full rounded-[3px] bg-white dark:bg-transparent">
        <RichTextPlugin
          ErrorBoundary={LexicalErrorBoundary}
          contentEditable={
            <ContentEditable
              className={clsx(
                "w-full  dark:text-gray-300 resize-none overflow-hidden text-ellipsis rounded-[3px] outline-none",
                className
              )}
            />
          }
          placeholder={
            <div className="pointer-events-none absolute left-0 top-0 flex h-full select-none dark:text-gray-400 items-center px-1 text-sm text-gray-500">
              Add your {action} here...
            </div>
          }
        />
      </div>
      <CodeHighlightPlugin />
      <ListPlugin />
    </EditorComposer>
  );
};
