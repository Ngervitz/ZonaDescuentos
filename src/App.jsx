import { BrowserRouter, Route, Routes } from "react-router-dom";
import BenefitsPage from "./pages/BenefitsPage";
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
        <Route path="*" element={<ProductNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
