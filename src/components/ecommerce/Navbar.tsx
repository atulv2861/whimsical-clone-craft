
import * as React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const categories = [
    { name: "Electronics", path: "/category/electronics" },
    { name: "Fashion", path: "/category/fashion" },
    { name: "Home & Furniture", path: "/category/home" },
    { name: "Appliances", path: "/category/appliances" },
    { name: "Beauty & Personal Care", path: "/category/beauty" },
    { name: "Toys & Baby", path: "/category/toys" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We would typically handle search here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-flipkart-blue sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-white font-bold italic text-2xl tracking-tight">
                Flipkart
              </div>
              <div className="hidden md:flex flex-col text-xs ml-1">
                <span className="text-white italic font-light">Explore</span>
                <span className="text-yellow-300 italic font-light">Plus</span>
              </div>
            </Link>
          </div>

          {/* Search bar - hidden on mobile, visible on desktop */}
          <div className="hidden md:flex flex-1 mx-4 relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full"
            >
              <div
                className={cn(
                  "flex items-center flex-1 bg-white rounded-sm overflow-hidden",
                  isSearchFocused ? "ring-2 ring-blue-400" : ""
                )}
              >
                <input
                  type="text"
                  ref={searchRef}
                  placeholder="Search for products, brands and more"
                  className="py-2 px-4 w-full outline-none text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button
                  type="submit"
                  className="bg-flipkart-blue text-white p-2"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button
              variant="text"
              size="sm"
              className="text-white hover:bg-blue-600"
            >
              <Link to="/login" className="flex items-center">
                <User className="h-4 w-4 mr-2" /> Login
              </Link>
            </Button>
            <Link
              to="/cart"
              className="flex items-center text-white hover:text-gray-200"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
            </Link>
            <div className="relative group">
              <button className="flex items-center text-white">
                <span>More</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-10 hidden group-hover:block">
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <Link
                  to="/wishlist"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Wishlist
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              to="/cart"
              className="text-white hover:text-gray-200"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="p-4">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center w-full mb-4"
              >
                <div
                  className={cn(
                    "flex items-center flex-1 bg-white border rounded-sm overflow-hidden",
                    isSearchFocused ? "ring-2 ring-blue-400" : ""
                  )}
                >
                  <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    className="py-2 px-4 w-full outline-none text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <button
                    type="submit"
                    className="bg-flipkart-blue text-white p-2"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </form>
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block p-2 rounded text-flipkart-blue font-medium"
                >
                  Login
                </Link>
                <div className="border-t border-gray-200 py-3">
                  <p className="font-medium text-gray-700 mb-2">Categories</p>
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-200 py-3">
                  <Link
                    to="/orders"
                    className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/profile"
                    className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    My Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories row - only on desktop */}
        <div className="hidden md:flex bg-white h-10 items-center px-4 overflow-x-auto">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="whitespace-nowrap px-3 py-1 text-sm font-medium text-gray-800 hover:text-flipkart-blue"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
