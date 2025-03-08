import React, { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArticletModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const context = useContext(AppContext);
  
  // Move useRef calls outside the conditional block
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  if (!context) return null;
  const { addContact } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameRef.current || !emailRef.current || !phoneRef.current) return;

    const newContact = {
      contact_id: uuidv4(),
      name: nameRef.current.value,
      alternative: emailRef.current.value,
      email1: phoneRef.current.value,
    };

    addContact(newContact);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Contact</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" ref={nameRef} placeholder="Name" required />
          <input type="email" ref={emailRef} placeholder="alternative" required />
          <input type="text" ref={phoneRef} placeholder="email1" required />
          <button type="submit">Save Contact</button>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticletModal;
