import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../Store/AuthSlice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "../../Common_components/Common_INPUT/Input.jsx";
import "./Signin.css";
import { useAuth } from "../../Context/AuthContext";

export default function Sign() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { signup } = useAuth();

  const onSubmit = async (data) => {
    setError("");

    const res = await signup(data.name, data.email, data.password);

    if (res.success) {
      navigate("/login");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="Main-box">
      <div className="Signup-main">
        <div className="Signup-text">
          <h2>Sign Up to Create an Account</h2>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          {error && <p>{error}</p>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-signup">
            <label>User Name : </label>
            <input
              placeholder="Enter your User Name"
              autoComplete="username"
              {...register("name", { required: "Full name is required" })}
            />
          </div>
          <div className="input-signup">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="username"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>

          <div className="input-signup">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              {...register("password", { required: "Password is required" })}
            />
          </div>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}
