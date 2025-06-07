"use client";
import React, { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
const initialState = {
  fullname: "",
  email: "",
  password: "",
};
export default function Register() {
  const { register, loading, error } = useAuthContext();

  const [userData, setUserData] = useState(initialState);

  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <form
        onSubmit={(e) => register(e, userData)}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <input
          value={userData.fullname}
          name="fullname"
          onChange={(e) =>
            setUserData({
              ...userData,
              [e.target.name]: e.target.value,
            })
          }
          required
          type="text"
          placeholder="Full name"
          className="w-full p-2 bg-gray-700 rounded border border-gray-600 placeholder-gray-400 focus:outline-none"
        />
        <input
          value={userData.email}
          name="email"
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
          value={userData.password}
          name="password"
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
          {loading ? "in Proccess..." : "Register"}
        </button>
      </form>
    </div>
  );
}
