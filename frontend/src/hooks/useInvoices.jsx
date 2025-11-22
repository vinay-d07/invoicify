import { useCallback } from 'react'

// Prefer Vite-exposed backend URL
const baseBackendUrl = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) || '';

const api = (path) => {
  if (!baseBackendUrl) return path;
  return `${baseBackendUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
};

function getAuthHeader() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function useInvoices() {
  const createInvoice = useCallback(async (payload) => {
    // payload should include fields expected by backend, e.g.:
    // { userId, invoiceNumber, invoiceDate, dueDate, client, items, subTotal, taxTotal, discount, total, currency, notes, terms, paymentDetails, status }
    const res = await fetch(api('/api/invoices/create'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create invoice');
    }

    return res.json();
  }, []);

  const getInvoice = useCallback(async (id) => {
    const res = await fetch(api(`/api/invoices/${encodeURIComponent(id)}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch invoice');
    }

    return res.json();
  }, []);

  const listInvoices = useCallback(async () => {
    const res = await fetch(api('/api/invoices'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to list invoices');
    }

    return res.json();
  }, []);

  return {
    createInvoice,
    getInvoice,
    listInvoices,
  };
}
