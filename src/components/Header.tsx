"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useAuthContext from "@/hooks/useAuthContext";

export default function Header() {
  const { isMounted, user, loading, logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">ChatApp</h1>
        {user && isMounted && <p>welcome {user}</p>}
        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6">
          {!user && isMounted ? (
            <>
              <Link
                href="/register"
                className="hover:text-blue-400 bg-black p-2 rounded-xl"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="hover:text-blue-400  bg-black p-2 rounded-xl"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              disabled={loading}
              onClick={logout}
              className="block hover:text-blue-400  "
            >
              {loading ? "in proccess..." : "Logout"}
            </button>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden px-4 pb-4 space-y-3 bg-gray-800 py-3"
          onClick={() => setIsOpen(false)}
        >
          {!user && isMounted ? (
            <>
              <Link
                href="/register"
                className="hover:text-blue-400 block bg-black p-2 rounded-xl w-fit"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="hover:text-blue-400 block bg-black p-2 rounded-xl w-fit"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              disabled={loading}
              onClick={logout}
              className="block hover:text-blue-400  "
            >
              {loading ? "in proccess..." : "Logout"}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
