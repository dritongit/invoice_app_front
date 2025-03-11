import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../utils/axiosInstance";

interface AuthContextType {
  user: string | null;
  token: string | null;
  userSettings: any;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUserSettings: (settings: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [userSettings, setUserSettings] = useState<string | null>(localStorage.getItem("settings"));

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

        const settingsResponse = await axios.get("/settings");

        setUserSettings(settingsResponse.data);
        localStorage.setItem("settings", JSON.stringify(settingsResponse.data));

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
    localStorage.removeItem("settings");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, userSettings, login, register, logout, setUserSettings }}>
      {children}
    </AuthContext.Provider>
  );
};
