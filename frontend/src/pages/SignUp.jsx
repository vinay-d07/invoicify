import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    try {
      const payload = {
        username: name,
        email,
        password,
        fullName: name,
      };
      await register(payload);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 w-screen" >
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium transition"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
