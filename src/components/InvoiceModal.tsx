import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import ContactSearch from "../components/ContactSearch";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const context = useContext(AppContext);

  const [invoiceData, setInvoiceData] = useState({
    contactName: "",
    contactEmail: "",
    contactId: "",
    alternative: "",
    address: "",
    phone: "",
    amount: "",
    status: ""
  });

  if (!context) return null;
  const { addInvoice } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoiceData.contactName || !invoiceData.amount || !invoiceData.status) return;

    const newInvoice = {
      invoice_id: uuidv4(),
      created_at: '',
      name: invoiceData.contactName,
      alternative: invoiceData.alternative,
      total_unit_price: parseFloat(invoiceData.amount),
      total_payment: 0,
      balance: 0,
    };

    addInvoice(newInvoice);
    onClose();
  };

  const handleContactSelect = (contact: any) => {
    setInvoiceData((prev) => ({
      ...prev,
      contactName: contact.name,
      contactEmail: contact.email1,
      contactId: contact.contact_id,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Invoice</h2>

        <div className="invoice-calculation">
          <div className="client-shipper">
            <div className="client">
              <ContactSearch onSelect={handleContactSelect} />
              
              <input
                type="text"
                name="contactName"
                placeholder="Name"
                value={invoiceData.contactName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="alternative"
                placeholder="Alternative"
                value={invoiceData.alternative}
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={invoiceData.address}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={invoiceData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="contactEmail"
                placeholder="Email"
                value={invoiceData.contactEmail}
                onChange={handleChange}
              />

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="contactName"
                  placeholder="Client"
                  value={invoiceData.contactName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={invoiceData.amount}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="status"
                  placeholder="Status"
                  value={invoiceData.status}
                  onChange={handleChange}
                  required
                />
              </form>
            </div>
            <div className="client shipper">
              <ContactSearch onSelect={handleContactSelect} />
              
              <input
                type="text"
                name="contactName"
                placeholder="Name"
                value={invoiceData.contactName}
                onChange={handleChange}
              />

              <input
                type="text"
                name="alternative"
                placeholder="Alternative"
                value={invoiceData.alternative}
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={invoiceData.address}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={invoiceData.phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="contactEmail"
                placeholder="Email"
                value={invoiceData.contactEmail}
                onChange={handleChange}
              />

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="contactName"
                  placeholder="Client"
                  value={invoiceData.contactName}
                  onChange={handleChange}
                  required
                />

                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={invoiceData.amount}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="status"
                  placeholder="Status"
                  value={invoiceData.status}
                  onChange={handleChange}
                  required
                />
              </form>
            </div>
          </div>

          <section className="invoice-details">
                <div className="tabs">
                    <button className="tab-btn active" data-tab="products">Products/Services</button>
                    <button className="tab-btn" data-tab="payment">Payment</button>
                    <button className="tab-btn" data-tab="invoice-message">Invoice Message</button>
                </div>

                <div className="tab-content active" id="products">
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Taxed</th>
                                <th>Rate %</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Tax</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Fanta</td>
                                <td><input type="checkbox" /></td>
                                <td>18.00</td>
                                <td>1</td>
                                <td>12.00</td>
                                <td>12.00</td>
                                <td>12.00</td>
                            </tr>
                            <tr>
                                <td>Makiato e madhe</td>
                                <td><input type="checkbox" /></td>
                                <td>18.00</td>
                                <td>2</td>
                                <td>12.00</td>
                                <td>12.00</td>
                                <td>12.00</td>
                            </tr>
                            <tr>
                                <td>Birra Peja</td>
                                <td><input type="checkbox" /></td>
                                <td>18.00</td>
                                <td>1</td>
                                <td>12.00</td>
                                <td>12.00</td>
                                <td>12.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="tab-content" id="payment">
                    <h4>Payment Section</h4>
                    <p>Payment details will go here...</p>
                </div>

                <div className="tab-content" id="invoice-message">
                    <h4>Invoice Message</h4>
                    <textarea placeholder="Enter your message..."></textarea>
                </div>
            </section>

        </div>
        <div className="invoice-info">
          <div className="total-section">
            <p><strong>Paid:</strong><span>2000.00 €</span></p>
            <p><strong>Balance:</strong> 13.78 €</p>
            <p><strong>Sub-total:</strong> 2000.00 €</p>
            <p><strong>VAT:</strong> 13.78 €</p>
            <p><strong>Invoice #:</strong> 2173512077</p>
            <p><strong>Date:</strong> 09/02/2018</p>
            <p><strong>Due:</strong> 10/02/2018</p>
          </div>
          <button type="submit">Save Invoice</button>
          <button type="button" className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
