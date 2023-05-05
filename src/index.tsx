import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import "./index.css";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider
    authType={"cookie"}
    authName="_auth"
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
