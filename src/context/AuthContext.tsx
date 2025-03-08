import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../utils/axiosInstance";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      setUser(email);
      setToken(response.data.token);
      localStorage.setItem("user", email);
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await axios.post("/register", { email, password });
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
