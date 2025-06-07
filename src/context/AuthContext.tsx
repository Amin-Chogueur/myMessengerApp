"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, FormEvent, useEffect, useState } from "react";

type LoginDataType = {
  email: string;
  password: string;
};
type RegisterDataType = {
  fullname: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: string | null;
  isMounted: boolean;
  loading: boolean;
  error: null | string;
  register: (e: FormEvent, userData: RegisterDataType) => void;
  login: (e: FormEvent, userData: LoginDataType) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("userName");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    setIsMounted(true);
  }, []);
  async function register(e: FormEvent, userData: RegisterDataType) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await axios.post("https://amin-messenger-app.vercel.app/api/register", userData);

      router.push("/login");
    } catch (error) {
      console.log(error);
      setError("Oops! something went wrong");
    } finally {
      setLoading(false);
    }
  }
  async function login(e: FormEvent, userData: LoginDataType) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post("https://amin-messenger-app.vercel.app/api/login", userData);
      const data = res.data;
      setUser(data.userName);
      localStorage.setItem("userName", JSON.stringify(data.userName));
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Oops! something went wrong");
    } finally {
      setLoading(false);
    }
  }
  async function logout() {
    try {
      setLoading(true);
      await axios.get("https://amin-messenger-app.vercel.app/api/logout");
      setUser(null);
      router.push("/login");
      localStorage.removeItem("userName");
    } catch (error) {
      console.log(error);
      setError("Oops! something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthContext.Provider
      value={{ login, logout, register, loading, error, user, isMounted }}
    >
      {children}
    </AuthContext.Provider>
  );
}
