import useMessagesContext from "@/hooks/useMessagesContext";
import React from "react";

export default function ChatHeader() {
  const { selectedConversation } = useMessagesContext();
  if (!selectedConversation) {
    return;
  }
  return (
    <div className="p-4 border-b border-gray-700 flex items-center">
      <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
        {selectedConversation.userId.fullname.charAt(0)}
      </div>
      <div>
        <h3 className="font-semibold">
          {selectedConversation.userId.fullname}
        </h3>
        <p className="text-sm text-gray-400">
          {selectedConversation.userId.email}
        </p>
      </div>
    </div>
  );
}
