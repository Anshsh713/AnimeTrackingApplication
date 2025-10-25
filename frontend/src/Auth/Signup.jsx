import React, { useState } from "react";
import axios from "axios";

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/signup", form);
    alert("Signup successful! Now login.");
    onSignup();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded space-y-3"
    >
      <h2 className="text-xl font-semibold">Sign Up</h2>
      <input
        name="name"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        className="border p-2 w-full rounded"
      />
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
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Signup
      </button>
    </form>
  );
}
