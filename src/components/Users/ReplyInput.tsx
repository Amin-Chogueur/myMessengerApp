import React, { Dispatch, SetStateAction } from "react";

type ReplayInputProps = {
  sendMessage: () => void;
  setContent: Dispatch<SetStateAction<string>>;
  content: string;
};
export default function ReplyInput({
  sendMessage,
  content,
  setContent,
}: ReplayInputProps) {
  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800">
      <div className="flex items-end gap-2">
        <textarea
          className="flex-1 bg-gray-700 text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-400"
          placeholder="Type your reply..."
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
