
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/ECommerce/Home";
import CategoryPage from "@/pages/ECommerce/CategoryPage";
import ProductDetail from "@/pages/ECommerce/ProductDetail";
import Cart from "@/pages/ECommerce/Cart";
import Checkout from "@/pages/ECommerce/Checkout";
import Login from "@/pages/ECommerce/Login";
import SignUp from "@/pages/ECommerce/SignUp";
import SearchPage from "@/pages/ECommerce/SearchPage";
import MyOrders from "@/pages/ECommerce/MyOrders";
import Profile from "@/pages/ECommerce/Profile";
import Wishlist from "@/pages/ECommerce/Wishlist";
import TrendingPage from "@/pages/ECommerce/TrendingPage";
import DealsPage from "@/pages/ECommerce/DealsPage";
import AboutPage from "@/pages/ECommerce/AboutPage";
import ContactPage from "@/pages/ECommerce/ContactPage";
import Settings from "@/pages/ECommerce/Settings";
import { CartProvider } from "@/contexts/CartContext";
import BasicPage from "@/pages/ECommerce/BasicPage";
import AdminDashboard from "@/pages/ECommerce/Admin/Dashboard";
import AdminOrders from "@/pages/ECommerce/Admin/Orders";
import AdminProducts from "@/pages/ECommerce/Admin/Products";
import AdminOrderDetail from "@/pages/ECommerce/Admin/OrderDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/basic-components" element={<BasicPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders/:orderId" element={<AdminOrderDetail />} />
          
          <Route path="/template" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
