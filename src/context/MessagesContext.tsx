"use client";
import axios from "axios";
import { createContext, ReactNode, useCallback, useState } from "react";

export type UserType = {
  _id: string;
  fullname: string;
  email: string;
  role: string;
};

export type ConversationType = {
  _id: string;
  userId: UserType;
  updatedAt: string;
  unreadCount?: number;
};

export type MessageType = {
  _id: string;
  content: string;
  role: string;
  senderId: UserType;
  createdAt: string;
};
type MessagesContextType = {
  isLoading: boolean;
  reply: string;
  isSidebarOpen: boolean;
  conversations: ConversationType[];
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  sendReply: () => void;
  setReply: React.Dispatch<React.SetStateAction<string>>;
  fetchMessages: (conversation: ConversationType) => void;
  fetchConversations: () => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

import React from "react";

export default function MessagesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fetchConversations = useCallback(async function fetchConversations() {
    setIsLoading(true);
    try {
      const res = await axios.get("https://amin-messenger-app.vercel.app/api/conversations");
      setConversations(res.data);
    } catch (error) {
      console.error("Failed to fetch conversations", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function fetchMessages(conversation: ConversationType) {
    setIsLoading(true);
    try {
      setSelectedConversation(conversation);
      const res = await axios.get(`https://amin-messenger-app.vercel.app/api/conversations/${conversation._id}`);
      setMessages(res.data);

      // Mark as read
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === conversation._id ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function sendReply() {
    if (!reply.trim() || !selectedConversation) return;

    try {
      const res = await axios.post("/api/messages", {
        content: reply,
        selectedConversationId: selectedConversation._id,
      });

      setMessages([...messages, res.data.message]);
      setReply("");

      // Update conversation last updated time
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === selectedConversation._id
            ? { ...conv, updatedAt: new Date().toISOString() }
            : conv
        )
      );
    } catch (error) {
      console.error("Failed to send message", error);
    }
  }

  return (
    <MessagesContext.Provider
      value={{
        conversations,
        reply,
        isLoading,
        isSidebarOpen,
        messages,
        selectedConversation,
        setReply,
        fetchMessages,
        fetchConversations,
        sendReply,
        setIsSidebarOpen,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
