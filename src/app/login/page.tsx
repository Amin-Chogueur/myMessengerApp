"use client";
import useAuthContext from "@/hooks/useAuthContext";

import React, { useState } from "react";

const intialState = {
  email: "",
  password: "",
};

export default function Login() {
  const { loading, login, error } = useAuthContext();
  const [userData, setUserData] = useState(intialState);

  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <form
        onSubmit={(e) => login(e, userData)}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          name="email"
          value={userData.email}
          onChange={(e) =>
            setUserData({
              ...userData,
              [e.target.name]: e.target.value,
            })
          }
          required
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-gray-700 rounded border border-gray-600 placeholder-gray-400 focus:outline-none"
        />
        <input
          name="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({
              ...userData,
              [e.target.name]: e.target.value,
            })
          }
          required
          type="password"
          placeholder="Password"
          className="w-full p-2 bg-gray-700 rounded border border-gray-600 placeholder-gray-400 focus:outline-none"
        />
        {error && <p className="text-red-500 my-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:bg-gray-500"
        >
          {loading ? "in Proccess..." : "Login"}
        </button>
      </form>
    </div>
  );
}
