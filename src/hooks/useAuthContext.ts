import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export default useAuthContext;
