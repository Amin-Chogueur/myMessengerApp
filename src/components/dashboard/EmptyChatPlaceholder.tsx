import React from "react";

export default function EmptyChatPlaceholder() {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-800">
      <div className="text-center p-6 max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 mx-auto text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-200">
          Select a conversation
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose a conversation from the sidebar to start messaging
        </p>
      </div>
    </div>
  );
}
