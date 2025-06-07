"use client";

import ChatHeader from "@/components/Users/ChatHeader";
import Messages from "@/components/Users/Messages";
import ReplyInput from "@/components/Users/ReplyInput";
import axios from "axios";

import { useEffect, useState } from "react";

export type ConversationType = {
  _id: string;
  content: string;
  createdAt: Date;
  role: "admin" | "user";
};

export default function MessagesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ConversationType[]>();
  const [content, setContent] = useState("");
  async function sendMessage() {
    try {
      const res = await axios.post("http://localhost:3000/api/messages", {
        content,
      });
      const data = res.data.message;
      const newMessage = {
        content: data.content,
        createdAt: data.createdAt,
        _id: data._id,
        role: data.role,
      };
      console.log(data);
      setMessages((prev) => [...prev!, newMessage]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchConversations() {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/messages");
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchConversations();
  }, []);
  return (
    <div className="flex-1 flex flex-col bg-gray-900 text-white h-screen max-w-3xl mx-auto">
      {/* Chat Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          messages && messages?.length > 0 && <Messages messages={messages} />
        )}
      </div>

      {/* Reply Input (non-functional) */}
      <ReplyInput
        sendMessage={sendMessage}
        content={content}
        setContent={setContent}
      />
    </div>
  );
}
