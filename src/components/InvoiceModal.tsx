import React, { useContext, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const context = useContext(AppContext);

  const clientRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  
  if (!context) return null;
  
  const { addInvoice } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientRef.current || !amountRef.current || !statusRef.current) return;

    const newInvoice = {
      invoice_id: uuidv4(),
      name: clientRef.current.value,
      alternative: amountRef.current.value,
      total_unit_price: parseFloat(amountRef.current.value)
    };

    addInvoice(newInvoice);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Invoice</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" ref={clientRef} placeholder="Client" required />
          <input type="number" ref={amountRef} placeholder="Amount" required />
          <input type="text" ref={statusRef} placeholder="Status" required />
          <button type="submit">Save Invoice</button>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;
