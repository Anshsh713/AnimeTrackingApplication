import React, { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../Store/AuthSlice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../../Common_components/Common_INPUT/Input.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import "./Login.css";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const onSubmit = async (data) => {
    setloading(true);
    setError("");

    const res = await login(data.email, data.password);

    if (res.success) {
      navigate("/home");
    } else {
      setError(res.message);
    }

    setloading(false);
  };

  return (
    <div className="Main-box">
      <div className="Login-main">
        <div className="Login-text">
          <h2>Identify Yourself</h2>
          <p>
            New to the Realm? <Link to="/signin">Cultivate an Account</Link>
          </p>
          {error && <p className="error-msg">{error}</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-login">
            <label>Email :</label>
            <input
              placeholder="Enter your email"
              autoComplete="username"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>

          <div className="input-login">
            <label>Password :</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}
