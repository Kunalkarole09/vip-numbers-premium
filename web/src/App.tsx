import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ShopProvider } from "@/context/ShopContext";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { BrowsePage } from "@/pages/BrowsePage";
import { SearchPage } from "@/pages/SearchPage";
import { NumberDetailPage } from "@/pages/NumberDetailPage";
import { CartPage } from "@/pages/CartPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { AboutPage } from "@/pages/AboutPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ProcessPage } from "@/pages/ProcessPage";
import { ContactPage } from "@/pages/ContactPage";
import { FaqPage } from "@/pages/FaqPage";
import { HomeDeliveryPage } from "@/pages/HomeDeliveryPage";
import { ResellerPage } from "@/pages/ResellerPage";
import { LegalPage } from "@/pages/LegalPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="numbers" element={<BrowsePage />} />
            <Route path="numbers/:id" element={<NumberDetailPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="home-delivery" element={<HomeDeliveryPage />} />
            <Route path="reseller" element={<ResellerPage />} />
            <Route path="legal/:slug" element={<LegalPage />} />
            <Route path="vvip" element={<Navigate to="/numbers?category=vvip" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}
