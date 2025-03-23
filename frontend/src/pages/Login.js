import React from "react";
import "./Login.css";
import googleLogo from "../pages/google-logo.png"; 
import githubLogo from "../pages/github-logo.png"; 

const Login = () => {
  return (
    <div className="loginPageContainer">
      <h1 className="apiveilTitle">APIVeil</h1>
      
      <form className="loginForm">
        <label className="inputLabel">Email</label>
        <input type="email" className="inputField" />

        <label className="inputLabel">Password</label>
        <input type="password" className="inputField" />

        <a href="#" className="forgotPasswordLink">Forgot Password?</a>

        <button type="submit" className="loginButton">Login</button>

        <button type="button" className="socialLoginButton googleLoginButton">
          <img src={googleLogo} alt="Google Logo" className="socialLogo" />
          Login with Google
        </button>

        <button type="button" className="socialLoginButton githubLoginButton">
          <img src={githubLogo} alt="GitHub Logo" className="socialLogo" />
          Login with GitHub
        </button>

        <div className="signupText">
          Don’t have an account? <a href="#" className="signupLink">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
