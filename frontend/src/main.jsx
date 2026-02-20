// "main.jsx" is basically the main JSX file, which connect to "App.jsx" file and render the whole application to the DOM.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
