import { MessagesContext } from "@/context/MessagesContext";
import { useContext } from "react";

function useMessagesContext() {
  const context = useContext(MessagesContext);
  if (!context)
    throw new Error("useMessagesContext must be used within AuthProvider");
  return context;
}

export default useMessagesContext;
