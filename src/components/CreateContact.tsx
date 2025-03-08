import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const CreateContact = () => {
  const context = useContext(AppContext);

  if (!context) return <p>Loading...</p>;
  const { fetchContacts } = context; // ✅ Marrim funksionin për rifreskimin e kontakteve

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/api/contact_add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      fetchContacts(); // ✅ Rifreskojmë listën e kontakteve pas krijimit të një kontakti të ri
      setFormData({ name: "", email: "", phone: "" }); // ✅ Pastrojmë fushat e input-it
    } catch (error) {
      console.error("Error creating contact", error);
    }
  };

  return (
    <div>
      <h2>Create Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Contact</button>
      </form>
    </div>
  );
};

export default CreateContact;
