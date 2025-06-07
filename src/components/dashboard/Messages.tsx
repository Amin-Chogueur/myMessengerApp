import useMessagesContext from "@/hooks/useMessagesContext";
import React from "react";

export default function Messages() {
  const { isLoading, messages } = useMessagesContext();
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : messages.length ? (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.role === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 ${
                  msg.role === "admin"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                <div className="break-words overflow-hidden w-full">
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.role === "admin" ? "text-blue-200" : "text-gray-400"
                    }`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No messages yet
        </div>
      )}
    </div>
  );
}
