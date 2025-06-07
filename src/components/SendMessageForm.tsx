"use client";

import axios from "axios";
import { FormEvent, useState } from "react";

export default function SendMessageForm() {
  const [content, setContent] = useState("");
  async function sendMessage(e: FormEvent) {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3000/api/messages", {
        content,
      });
      const data = res.data;
      console.log(data);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={sendMessage}
      className=" max-w-2xl mx-auto mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
    >
      <textarea
        placeholder="Write your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows={2}
        className="w-full p-2 mb-3  rounded bg-white dark:bg-gray-700 text-black dark:text-white"
      />

      <button
        type="submit"
        className="w-fit block ml-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 cursor-pointer rounded disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
