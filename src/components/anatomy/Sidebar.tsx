import React from "react";
import { Link } from "react-router-dom";
import "../../styles/App.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/invoices">Invoices</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/articles">Articles</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
