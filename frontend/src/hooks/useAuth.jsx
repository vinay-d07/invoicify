import { useState, useEffect, useCallback } from "react";
// import { useNavigation } from "react-router-dom";

export default function useAuth() {
//   const location = useNavigation();
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch {}
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const isAuthenticated = !!token;

  
  const baseBackendUrl =
    (typeof import.meta !== 'undefined' &&
      (import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL));

  const api = (path) => {
    if (!baseBackendUrl) return path; // use relative path if no base provided
    return `${baseBackendUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
  };

  const login = useCallback(async (credentials) => {
    console.log(JSON.stringify(credentials))
    const res = await fetch('http://localhost:8080/api/users/login', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    console.log(res)
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Login failed");
    }

    const data = await res.json();
    // Expecting { token, user }
    setToken(data.token || data.accessToken || null);
    setUser(data.user || null);
    localStorage.setItem("token", data.token || data.accessToken || null);
    localStorage.setItem("user", JSON.stringify(data.user || null));
    return data;
  }, []);

  const register = useCallback(async (payload) => {
    // payload e.g. { name, email, password }
    const res = await fetch(api('/api/users'), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Registration failed");
    }

    const data = await res.json();

    if (data.token || data.accessToken) {
      setToken(data.token || data.accessToken);
    }
    if (data.user) setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    register,
    setUser,
    setToken,
  };
}
