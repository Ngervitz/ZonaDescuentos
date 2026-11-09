import { createRoot } from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./wizard/preserveWizardBundle";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>,
);
