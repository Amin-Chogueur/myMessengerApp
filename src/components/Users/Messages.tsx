import React from "react";
type MessagesProps = {
  _id: string;
  role: string;
  content: string;
  createdAt: Date;
};

export default function Messages({ messages }: { messages: MessagesProps[] }) {
  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-gray-700 text-gray-100 rounded-bl-none"
            }`}
          >
            <div className="break-words overflow-hidden w-full">
              <p className="text-sm whitespace-pre-wrap break-words flex">
                {msg.role === "admin" && (
                  <span className="bg-blue-600 text-white rounded-full h-5 w-5 flex items-center  justify-center mr-3">
                    A
                  </span>
                )}
                <span>{msg.content}</span>
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
  );
}
