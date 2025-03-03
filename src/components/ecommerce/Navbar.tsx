import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu, X, Settings } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface NavbarProps {
  hideSearch?: boolean;
}

export const Navbar = ({ hideSearch = false }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-flipkart-blue text-white shadow-md sticky top-0 z-50">
      <div className="bg-blue-900 py-1 text-xs text-center">
        Free shipping on orders over ₹499
      </div>
      
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              alt="Flipkart"
              className="h-6"
            />
          </Link>

          {!hideSearch && (
            <div className="hidden lg:block relative flex-grow max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/admin/dashboard" className="hidden md:flex items-center space-x-1 text-white">
            <Settings className="h-5 w-5" />
            <span>Admin</span>
          </Link>
          
          <Link to="/login" className="hidden md:flex items-center space-x-1 text-white">
            <User className="h-5 w-5" />
            <span>Login</span>
          </Link>
          <Link to="/cart" className="flex items-center space-x-1 text-white relative">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full px-2 text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/wishlist" className="hidden md:flex items-center space-x-1 text-white">
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isMobileMenuOpen && (
        <div className="bg-blue-600 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-800 focus:outline-none"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navbar */}
      <nav className="bg-blue-700 md:hidden">
        <div className="container mx-auto px-4 py-2 flex justify-around">
          <Link to="/" className="flex flex-col items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m1-10V4a1 1 0 00-1-1H9m4 6v6a1 1 0 001 1h3m-3-10V4a1 1 0 00-1-1H15"
              />
            </svg>
            <span>Home</span>
          </Link>
          <Link to="/category/electronics" className="flex flex-col items-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>Categories</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center text-white">
            <User className="h-6 w-6" />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};
