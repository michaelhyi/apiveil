import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProxyForm from "./components/create_proxy_form";
import IndexPage from "./components/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_proxy_form" element={<CreateProxyForm />} />
        <Route path="/proxy/:proxyId" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}

export default App;
