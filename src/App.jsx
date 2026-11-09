import { BrowserRouter, Route, Routes } from "react-router-dom";
import { directPurchaseEnabled } from "./config/commerceFlags";
import BenefitsPage from "./pages/BenefitsPage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductNotFoundPage from "./pages/ProductNotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/beneficios" element={<BenefitsPage />} />
        <Route path="/producto/:slug" element={<ProductPage />} />
        {directPurchaseEnabled && (
          <>
            <Route path="/tienda" element={<CatalogPage />} />
            <Route path="/carrito" element={<CartPage />} />
          </>
        )}
        <Route path="*" element={<ProductNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
