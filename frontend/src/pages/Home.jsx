import React from "react";
import Dashboard from "../components/ui/Dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <h1 className="text-2xl font-semibold text-gray-900 mb-10">
          Invoicify
        </h1>
        <nav className="space-y-3 text-gray-700 text-sm">
          <a href="#" className="block hover:text-blue-600">
            Dashboard
          </a>
          <a href="#" className="block hover:text-blue-600">
            Invoices
          </a>
          <a href="#" className="block hover:text-blue-600">
            Clients
          </a>
          <a href="#" className="block hover:text-blue-600">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Welcome Back 👋</h2>
          <div className="text-sm text-gray-600">{localStorage.getItem('user')}</div>
        </header>
        <Dashboard />
      </main>
    </div>
  );
}
