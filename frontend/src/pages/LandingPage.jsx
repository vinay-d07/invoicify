import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-semibold text-gray-900">Invoicify</h1>
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <a href="#features" className="hover:text-blue-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>
        </nav>
        <div className="space-x-4">
          <a
            href="/login"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign up
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Invoicify
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-10">
          Simplify your invoicing. Manage clients, track payments, and stay on
          top of your finances — all in one clean, intuitive platform.
        </p>
        <a
          href="/signup"
          className="px-6 py-3 bg-blue-600 text-black rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="grid md:grid-cols-3 gap-8 px-8 py-20 bg-white border-t border-gray-200"
      >
        {[
          {
            title: "Fast Invoicing",
            desc: "Create and send professional invoices in just a few clicks with customizable templates.",
          },
          {
            title: "Payment Tracking",
            desc: "Monitor due and completed payments effortlessly with smart tracking tools.",
          },
          {
            title: "Client Management",
            desc: "Keep all your client details organized and accessible in one secure dashboard.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white text-center py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Invoicify. All rights reserved.
      </footer>
    </div>
  );
}
