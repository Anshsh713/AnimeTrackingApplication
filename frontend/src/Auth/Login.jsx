import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login", form);
    localStorage.setItem("token", res.data.token);
    alert("Login successful!");
    onLogin();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded space-y-3"
    >
      <h2 className="text-xl font-semibold">Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        className="border p-2 w-full rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
