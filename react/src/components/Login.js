import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';
import googleLogo from "./google-logo.png";
import githubLogo from "./github-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert("Login failed! Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="auth-container">
      <h1>APIVeil</h1>
      <h2>Login To Your Account</h2>

      <form className="auth-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="forgot-password">
          <a href="#" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="btn-primary">
          Login
        </button>

        <div className="or-separator">
          <span>OR</span>
        </div>

        <button type="button" className="btn-social google-login">
          <img src={googleLogo} alt="Google" />
          Login with Google
        </button>
        <button type="button" className="btn-social github-login">
          <img src={githubLogo} alt="GitHub" />
          Login with GitHub
        </button>

        <div className="register-link">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
