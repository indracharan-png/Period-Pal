import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CyclesContextProvider } from "./context/CycleContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CyclesContextProvider>
        <App />
      </CyclesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
