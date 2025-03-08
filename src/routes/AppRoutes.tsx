import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Invoices from "../pages/Invoices";
import Contacts from "../pages/Contacts";
import Articles from "../pages/Articles";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/anatomy/Layout";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const context = useContext(AuthContext);
  if (!context || !context.token) return <Navigate to="/login" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<Layout />}>
          <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
          <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
          <Route path="/articles" element={<PrivateRoute><Articles /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
