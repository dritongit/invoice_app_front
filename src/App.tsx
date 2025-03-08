import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
