import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ExportApp from "./components/ExportApp.tsx";
import "./index.css";

// Check if we're running in export mode (meta tag injected by ExportButton)
const isExport = !!document.querySelector('meta[name="x-export-mode"]');

createRoot(document.getElementById("root")!).render(
  isExport ? <ExportApp /> : <App />
);
