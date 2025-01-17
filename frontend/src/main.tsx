import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Rourter } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Rourter>
      <App />
    </Rourter>
    <Toaster/>
  </StrictMode>
);