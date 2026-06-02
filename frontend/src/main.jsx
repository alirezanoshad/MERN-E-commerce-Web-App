// "main.jsx", basically The main JSX file, which connects to "App.jsx" file and render the whole application to the DOM.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
