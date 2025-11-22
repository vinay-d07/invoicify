import React, { useState } from "react";
import useInvoices from "../../hooks/useInvoices";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

export default function CreateInvoiceModal({ onClose }) {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("draft");
  const [total, setTotal] = useState("");
  const { createInvoice } = useInvoices();
  const { user } = useAuth();

  // prefill client email if logged-in user has an email
  React.useEffect(() => {
    if (user && user.email) {
      setClientEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate required fields
    if (!invoiceNumber || !clientName || !invoiceDate || !dueDate || !total) {
      toast.error('Please fill invoice number, client, dates and total');
      return;
    }

    const numericTotal = Number(total) || 0;

    // Ensure at least one item (backend requires items entries)
    const defaultItem = {
      description: 'Item 1',
      quantity: 1,
      unitPrice: numericTotal,
      taxRate: 0,
      total: numericTotal,
    };

    const payload = {
      invoiceNumber,
      invoiceDate,
      dueDate,
      client: { name: clientName, email: clientEmail || (user && user.email) || '' },
      items: [defaultItem],
      subTotal: numericTotal,
      taxTotal: 0,
      discount: 0,
      total: numericTotal,
      currency: "INR",
      notes: "",
      terms: "",
      paymentDetails: {},
      status,
    };

    try {
      await createInvoice(payload);
      toast.success("Invoice created successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create invoice");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Create Invoice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="INV-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Acme Corp"
              />
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Email
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="client@example.com"
                />
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Date
              </label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Amount
              </label>
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="₹0.00"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
