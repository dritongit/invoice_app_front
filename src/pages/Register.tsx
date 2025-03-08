import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!context) return <p>Loading...</p>;

  const { register } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(email, password);
    if (success) navigate("/login"); // ✅ Pas regjistrimit, dërgohet në `login`
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
