import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard";
import { CountryDataProvider } from "hooks";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountryDataProvider>
      <Dashboard />
    </CountryDataProvider>
  </StrictMode>,
);
