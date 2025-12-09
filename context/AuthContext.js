"use client";
import { createContext, useContext } from "react";
import { useAuthState } from "@/hooks/useAuthState";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authState = useAuthState();
  
  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};