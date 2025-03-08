import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import InvoiceModal from "../components/InvoiceModal";

const Invoices = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);

  // Ensure context is loaded
  if (!context) return <p>Loading...</p>;

  // Extract values from AppContext
  const { invoices, currentPage, totalPages, setCurrentPage } = context;

  return (
    <div>
      <h2>Invoices</h2>
      <button onClick={() => setModalOpen(true)}>+ Add Invoice</button>
      <ul>
        {invoices.length > 0 ? (
          invoices.map((invoice) => (
            <li key={invoice.invoice_id}>
              {invoice.name} - ${invoice.alternative} - {invoice.total_unit_price}
            </li>
          ))
        ) : (
          <p>No invoices found.</p>
        )}
      </ul>

      <div>
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        
        <span> Page {currentPage} of {totalPages} </span>

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <InvoiceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Invoices;