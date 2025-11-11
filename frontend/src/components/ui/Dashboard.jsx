import React, { useState } from "react";
import CreateInvoiceModal from "./CreateInvoiceModal";
import ViewInvoiceModal from "./ViewInvoiceModal";

export default function Dashboard() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Example invoice data (replace with fetched data)
  const invoices = [
    {
      invoiceNumber: "INV-001",
      client: {
        name: "Acme Corp",
        email: "billing@acme.com",
        address: {
          street: "123 Main St",
          city: "Bangalore",
          state: "KA",
          postalCode: "560001",
          country: "India",
        },
      },
      status: "paid",
      total: 12500,
      dueDate: "2025-12-01",
      invoiceDate: "2025-11-10",
      subTotal: 11000,
      taxTotal: 1500,
      discount: 0,
      items: [
        {
          description: "Web Design Service",
          quantity: 1,
          unitPrice: 11000,
          taxRate: 10,
          total: 12100,
        },
      ],
    },
  ];

  return (
    <div className="p-6">
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
              <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{inv.invoiceNumber}</td>
                <td className="px-6 py-3">{inv.client.name}</td>
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
        <CreateInvoiceModal onClose={() => setIsCreateOpen(false)} />
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
