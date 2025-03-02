
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";

// Original pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// E-commerce pages
import Home from "./pages/ECommerce/Home";
import ProductDetail from "./pages/ECommerce/ProductDetail";
import Login from "./pages/ECommerce/Login";
import SignUp from "./pages/ECommerce/SignUp";
import Cart from "./pages/ECommerce/Cart";
import Checkout from "./pages/ECommerce/Checkout";
import MyOrders from "./pages/ECommerce/MyOrders";
import Wishlist from "./pages/ECommerce/Wishlist";
import Profile from "./pages/ECommerce/Profile";
import Settings from "./pages/ECommerce/Settings";
import CategoryPage from "./pages/ECommerce/CategoryPage";
import AboutPage from "./pages/ECommerce/AboutPage";
import ContactPage from "./pages/ECommerce/ContactPage";
import SearchPage from "./pages/ECommerce/SearchPage";
import BasicPage from "./pages/ECommerce/BasicPage";
import DealsPage from "./pages/ECommerce/DealsPage";
import TrendingPage from "./pages/ECommerce/TrendingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Original app route */}
            <Route path="/original" element={<Index />} />
            
            {/* E-commerce routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            
            {/* New Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Basic Page routes for footer links */}
            <Route path="/payments" element={<BasicPage />} />
            <Route path="/shipping" element={<BasicPage />} />
            <Route path="/returns" element={<BasicPage />} />
            <Route path="/faq" element={<BasicPage />} />
            <Route path="/return-policy" element={<BasicPage />} />
            <Route path="/terms" element={<BasicPage />} />
            <Route path="/security" element={<BasicPage />} />
            <Route path="/privacy" element={<BasicPage />} />
            <Route path="/careers" element={<BasicPage />} />
            <Route path="/press" element={<BasicPage />} />
            <Route path="/corporate" element={<BasicPage />} />
            <Route path="/report" element={<BasicPage />} />
            <Route path="/site-map" element={<BasicPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
