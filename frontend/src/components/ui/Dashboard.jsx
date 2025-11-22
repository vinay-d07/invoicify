import React, { useState, useEffect, useCallback } from "react";
import CreateInvoiceModal from "./CreateInvoiceModal";
import ViewInvoiceModal from "./ViewInvoiceModal";
import useInvoices from "../../hooks/useInvoices";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const { listInvoices } = useInvoices();

  const fetchInvoices = useCallback(async () => {
    try {
      const data = await listInvoices();
      setInvoices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load invoices', err);
    }
  }, [listInvoices]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div className="p-6">
      <Toaster />
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard</h2>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-4 py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition"
        >
          + Create Invoice
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Invoice #</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3 text-right">Total</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr key={inv._id || i} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{inv.invoiceNumber}</td>
                <td className="px-6 py-3">{inv.client?.name || '—'}</td>
                <td className="px-6 py-3 capitalize">{inv.status}</td>
                <td className="px-6 py-3">{inv.dueDate}</td>
                <td className="px-6 py-3 text-right font-medium">
                  ₹{inv.total}
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="px-3 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isCreateOpen && (
        <CreateInvoiceModal onClose={() => { setIsCreateOpen(false); fetchInvoices(); }} />
      )}
      {selectedInvoice && (
        <ViewInvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
