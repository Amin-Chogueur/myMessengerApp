import React from "react";

export default function ChatHeader() {
  return (
    <div className="p-4 border-b border-gray-700 flex items-center">
      <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center mr-3">
        A
      </div>
      <div>
        <h3 className="font-semibold">Amin Chogueur</h3>
        <p className="text-sm text-gray-400">chogueuramine@gmail.com</p>
      </div>
    </div>
  );
}
