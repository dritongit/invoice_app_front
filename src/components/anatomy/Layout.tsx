import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "../../styles/App.css";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
