import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

export const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = React.useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = React.useState(false);
  const [searchSuggestions, setSearchSuggestions] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const { totalItems } = useCart();
  const moreDropdownRef = React.useRef<HTMLDivElement>(null);
  const moreButtonRef = React.useRef<HTMLButtonElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);
  const searchSuggestionsRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    { name: "Electronics", path: "/category/electronics" },
    { name: "Fashion", path: "/category/fashion" },
    { name: "Home & Furniture", path: "/category/home-furniture" },
    { name: "Appliances", path: "/category/appliances" },
    { name: "Beauty & Personal Care", path: "/category/beauty" },
    { name: "Toys & Baby", path: "/category/toys" },
    { name: "Mobiles", path: "/category/mobiles" },
  ];

  const mockSuggestions = {
    "": [],
    "ip": ["iPhone 13", "iPhone 14", "iPhone 15", "iPad Pro", "iPad Mini"],
    "sam": ["Samsung Galaxy S23", "Samsung TV", "Samsung Refrigerator", "Samsung Washing Machine"],
    "lap": ["Laptop", "Laptop Bag", "Laptop Stand", "Laptop Cooler", "Laptop Charger"],
    "head": ["Headphones", "Headphone Case", "Headphone Stand", "Wireless Headphones"],
  };

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        setIsLoading(true);
        setTimeout(() => {
          const suggestions = Object.entries(mockSuggestions).find(([key]) => 
            searchQuery.toLowerCase().startsWith(key) && key !== ""
          );
          
          setSearchSuggestions(suggestions ? suggestions[1] : []);
          setIsLoading(false);
        }, 300);
      } else {
        setSearchSuggestions([]);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchSuggestionsRef.current &&
        !searchSuggestionsRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  let dropdownTimeout: NodeJS.Timeout | null = null;

  const handleMoreMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      dropdownTimeout = null;
    }
    setIsMoreDropdownOpen(true);
  };

  const handleMoreMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setIsMoreDropdownOpen(false);
    }, 300);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      dropdownTimeout = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setIsMoreDropdownOpen(false);
    }, 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
      console.log("Searching for:", searchQuery);
      setShowSearchSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchInputFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery.trim() && searchSuggestions.length > 0) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
    toast({
      title: "Search",
      description: `Searching for: ${suggestion}`,
    });
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleMoreItemClick = (path: string) => {
    setIsMoreDropdownOpen(false);
    navigate(path);
  };

  return (
    <header className="bg-flipkart-blue sticky top-0 z-50 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
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

          <div className="hidden md:flex flex-1 mx-4 relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full"
            >
              <div
                className={cn(
                  "flex items-center flex-1 bg-white rounded-sm overflow-hidden relative",
                  isSearchFocused ? "ring-2 ring-blue-400" : ""
                )}
              >
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  ref={searchRef}
                  placeholder="Search for products, brands and more"
                  className="py-2 pl-10 pr-4 w-full outline-none text-sm"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchInputFocus}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button
                  type="submit"
                  className="bg-flipkart-yellow text-black px-4 py-2 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
            
            {showSearchSuggestions && searchSuggestions.length > 0 && (
              <div 
                ref={searchSuggestionsRef}
                className="absolute top-full left-0 w-full bg-white rounded-b-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto"
              >
                {isLoading ? (
                  <div className="p-3 text-center text-gray-500">Loading suggestions...</div>
                ) : (
                  <ul>
                    {searchSuggestions.map((suggestion, index) => (
                      <li 
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <Search className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

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
              className="flex items-center text-white hover:text-gray-200 relative"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="relative" 
                onMouseEnter={handleMoreMouseEnter}
                onMouseLeave={handleMoreMouseLeave}
            >
              <button 
                ref={moreButtonRef}
                className="flex items-center text-white"
              >
                <span>More</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              {isMoreDropdownOpen && (
                <div 
                  ref={moreDropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-50"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <button
                    onClick={() => handleMoreItemClick("/my-orders")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => handleMoreItemClick("/wishlist")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => handleMoreItemClick("/profile")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => handleMoreItemClick("/settings")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="flex md:hidden items-center space-x-3">
            <Link
              to="/cart"
              className="text-white hover:text-gray-200 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
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

        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <div className="p-4">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center w-full mb-4"
              >
                <div
                  className={cn(
                    "flex items-center flex-1 bg-white border rounded-sm overflow-hidden relative",
                    isSearchFocused ? "ring-2 ring-blue-400" : ""
                  )}
                >
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    className="py-2 pl-10 pr-4 w-full outline-none text-sm"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchInputFocus}
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
              
              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="bg-white rounded-md shadow-lg mb-4 max-h-60 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-3 text-center text-gray-500">Loading suggestions...</div>
                  ) : (
                    <ul>
                      {searchSuggestions.map((suggestion, index) => (
                        <li 
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center border-b border-gray-100 last:border-b-0"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <Search className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block p-2 rounded text-flipkart-blue font-medium"
                  onClick={() => setIsMenuOpen(false)}
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
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-200 py-3">
                  <Link
                    to="/my-orders"
                    className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Wishlist
                  </Link>
                  <Link
                    to="/profile"
                    className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block p-2 text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
