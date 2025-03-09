import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import InvoiceModal from "../components/InvoiceModal";

const Invoices = () => {
  const context = useContext(AppContext);
  const [isModalOpen, setModalOpen] = useState(false);
  // const [sortColumn, setSortColumn] = useState("i.created_at");
  // const [sortOrder, setSortOrder] = useState("DESC");

  if (!context) return <p>Loading...</p>;

  const { invoices, currentPage, totalPages, sortColumn, sortOrder, setCurrentPage, fetchInvoices, setSortColumn, setSortOrder } = context;

  // Handle sorting
  const handleSort = (column: string) => {
    const newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortColumn(column);
    setSortOrder(newOrder);
    fetchInvoices(currentPage, sortColumn, sortOrder)
  };

  return (
    <div>
      <h2>Invoices</h2>
      <button onClick={() => setModalOpen(true)}>+ Add Invoice</button>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("c.name")}>Client Name</th>
            <th onClick={() => handleSort("i.created_at")}>Date</th>
            <th onClick={() => handleSort("total_unit_price")}>Total Price</th>
            <th onClick={() => handleSort("total_payment")}>Total Payment</th>
            <th onClick={() => handleSort("balance")}>Balance</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice) => (
              <tr key={invoice.invoice_id}>
                <td>{invoice.name || "N/A"}</td>
                <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                <td>${invoice.total_unit_price}</td>
                <td>${invoice.total_payment}</td>
                <td>${invoice.balance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No invoices found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>

      <InvoiceModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Invoices;