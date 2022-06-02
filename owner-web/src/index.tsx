import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import MainLandingPage from "./pages/MainLandingPage";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <>
    <App />
  </>
);
