import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import InvoiceModal from "../components/InvoiceModal";

const Invoices = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);
  if (!context) return <p>Loading...</p>;
  const { invoices } = context;

  return (
    <div>
      <h2>Invoices</h2>
      <button onClick={() => setModalOpen(true)}>+ Add Invoice</button>

      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.client} - ${invoice.amount} - {invoice.status}
          </li>
        ))}
      </ul>
      <InvoiceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Invoices;
