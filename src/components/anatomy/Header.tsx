import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  if (!context) return null;

  return (
    <header className="header">
      <h1>Invoice App</h1>
      <button onClick={() => { context.logout(); navigate("/login"); }}>Logout</button>
    </header>
  );
};

export default Header;
