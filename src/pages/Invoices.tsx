import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import InvoiceModal from "../components/InvoiceModal";

const Invoices = () => {
  const context = useContext(AppContext);
  if (!context) return <p>Loading...</p>;
//   const { invoices, openInvoiceModal } = context;
  const { invoices } = context;

  return (
    <div>
      <h2>Invoices</h2>
      {/* <button onClick={openInvoiceModal}>+ Add Invoice</button> ✅ Menaxhohet nga Context */}
      <button >+ Add Invoice</button> {/* ✅ Menaxhohet nga Context */}

      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.client} - ${invoice.amount} - {invoice.status}
          </li>
        ))}
      </ul>

      <InvoiceModal /> {/* ✅ Modali menaxhohet nga Context */}
    </div>
  );
};

export default Invoices;
