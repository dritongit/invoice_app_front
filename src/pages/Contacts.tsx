import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import ContactModal from "../components/ContactModal";

const Contacts = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);

  if (!context) return <p>Loading...</p>;
  const { contacts } = context;

  return (
    <div>
      <h2>Contacts</h2>
      <button onClick={() => setModalOpen(true)}>+ Add Contact</button>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.contact_id}>
            {contact.name} - {contact.email1} - {contact.alternative}{" "}
            {contact.isOffline && <span>(Offline)</span>}
          </li>
        ))}
      </ul>

      <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Contacts;
