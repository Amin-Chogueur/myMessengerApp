"use client";

import EmptyChatPlaceholder from "@/components/dashboard/EmptyChatPlaceholder";
import ChatHeader from "@/components/dashboard/ChatHeader";
import Messages from "@/components/dashboard/Messages";
import SideBar from "@/components/dashboard/SideBar";
import ReplayInput from "@/components/dashboard/ReplayInput";
import useMessagesContext from "@/hooks/useMessagesContext";
import { useEffect } from "react";

export type User = {
  _id: string;
  fullname: string;
  email: string;
  role: string;
};

export type Conversation = {
  _id: string;
  userId: User;
  updatedAt: string;
  unreadCount?: number;
};

export type Message = {
  _id: string;
  content: string;
  role: string;
  senderId: User;
  createdAt: string;
};

export default function AdminPanel() {
  const {
    setIsSidebarOpen,
    isSidebarOpen,
    selectedConversation,
    fetchConversations,
  } = useMessagesContext();
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 mt-10">
      {/* Sidebar */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="md:hidden absolute top-20 left-4 z-50 px-2 py-1 bg-gray-700 rounded"
      >
        {isSidebarOpen ? "⬅" : "➡"}
      </button>
      <SideBar />

      <div className="flex-1 flex flex-col bg-gray-900">
        {selectedConversation ? (
          <>
            <ChatHeader />

            <Messages />

            <ReplayInput />
          </>
        ) : (
          <EmptyChatPlaceholder />
        )}
      </div>
    </div>
  );
}
