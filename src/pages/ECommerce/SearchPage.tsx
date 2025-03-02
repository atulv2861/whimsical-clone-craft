
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { Button } from "@/components/Button";

// Mock search results
const mockProducts = [
  { 
    id: 1, 
    name: "OnePlus Nord CE 3 Lite 5G", 
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 19999, 
    originalPrice: 21999,
    rating: 4.5,
    discount: "9% off",
    inStock: true
  },
  { 
    id: 2, 
    name: "Apple iPhone 13", 
    image: "https://images.unsplash.com/photo-1592750475357-74d8a6c7bd3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 59999, 
    originalPrice: 69900,
    rating: 4.7,
    discount: "14% off",
    inStock: true
  },
  { 
    id: 3, 
    name: "Sony WH-1000XM4 Headphones", 
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 29990, 
    originalPrice: 32990,
    rating: 4.8,
    discount: "9% off",
    inStock: true
  },
  { 
    id: 4, 
    name: "Lenovo IdeaPad Slim 3", 
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 39990, 
    originalPrice: 45990,
    rating: 4.3,
    discount: "13% off",
    inStock: true
  },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Simulate API call with loading state
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Filter products based on query (in a real app, this would be an API call)
      const filteredProducts = mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [query]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Search Results</h1>
            <p className="text-gray-600">
              {isLoading ? "Searching..." : `Showing results for "${query}" (${searchResults.length} items)`}
            </p>
          </div>

          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : searchResults.length === 0 ? (
            // No results
            <div className="text-center py-12">
              <p className="text-2xl font-medium text-gray-500 mb-4">No results found</p>
              <p className="text-gray-500 mb-8">Try different keywords or browse categories</p>
              <Link to="/">
                <Button className="bg-flipkart-blue text-white hover:bg-blue-600">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            // Search results
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden product-card">
                  <Link to={`/product/${product.id}`}>
                    <div className="h-48 p-4 flex items-center justify-center relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-h-full object-contain product-img"
                      />
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1 truncate">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="bg-flipkart-green text-white text-xs px-1 py-0.5 rounded flex items-center">
                          {product.rating} <Star className="h-3 w-3 ml-0.5" fill="white" />
                        </div>
                        <span className="text-flipkart-darkgray text-xs ml-2">(1,024)</span>
                      </div>
                      <div className="mb-3">
                        <span className="text-lg font-medium">{formatPrice(product.price)}</span>
                        <span className="text-gray-500 text-sm line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-flipkart-green text-sm ml-2">{product.discount}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-full bg-flipkart-yellow hover:bg-yellow-500 text-black flex justify-center items-center"
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" /> ADD TO CART
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
