import useMessagesContext from "@/hooks/useMessagesContext";

export default function SideBar() {
  const {
    isSidebarOpen,
    conversations,
    isLoading,
    fetchMessages,
    selectedConversation,
    setIsSidebarOpen,
  } = useMessagesContext();
  return (
    <div
      className={`absolute md:static top-33 left-0 z-40 h-full w-64 bg-gray-800 border-r border-gray-700 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Conversations</h2>
        <p className="text-sm text-gray-400">
          {conversations.length} active chats
        </p>
      </div>

      {isLoading && !conversations.length ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv._id}
              onClick={() => {
                fetchMessages(conv);
                setIsSidebarOpen(false); // auto-close sidebar on mobile
              }}
              className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                selectedConversation?._id === conv._id
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{conv.userId.fullname}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {conv.userId.email}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">
                    {new Date(conv.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
