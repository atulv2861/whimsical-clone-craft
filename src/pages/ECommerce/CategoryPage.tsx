
import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { Filter, ShoppingCart, Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Mock data - in a real app this would come from API based on category
  const products = [
    {
      id: 1,
      name: "Smartphone X Pro",
      price: "$129.99",
      originalPrice: "$149.99",
      rating: 4.5,
      ratingCount: 2547,
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Smartphone",
      specs: ["6.1\" Display", "128GB Storage", "48MP Camera"]
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: "$49.99",
      originalPrice: "$69.99",
      rating: 4.3,
      ratingCount: 1892,
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Earbuds",
      specs: ["Noise Cancellation", "24h Battery", "Bluetooth 5.0"]
    },
    {
      id: 3,
      name: "Smart Watch Series 5",
      price: "$89.99",
      originalPrice: "$99.99",
      rating: 4.2,
      ratingCount: 942,
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Watch",
      specs: ["Heart Rate Monitor", "Sleep Tracking", "5 ATM Water Resistant"]
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: "$39.99",
      originalPrice: "$59.99",
      rating: 4.0,
      ratingCount: 763,
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Speaker",
      specs: ["360° Sound", "IPX7 Waterproof", "12h Playtime"]
    },
    {
      id: 5,
      name: "Wireless Charger",
      price: "$24.99",
      originalPrice: "$34.99",
      rating: 4.1,
      ratingCount: 512,
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Charger",
      specs: ["15W Fast Charging", "Multiple Device Support", "Sleep-Friendly LED"]
    },
    {
      id: 6,
      name: "Power Bank 20000mAh",
      price: "$49.99",
      originalPrice: "$59.99",
      rating: 4.4,
      ratingCount: 1289,
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=PowerBank",
      specs: ["20000mAh Capacity", "Fast Charging", "Multiple Ports"]
    },
  ];

  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
  };
  
  const displayName = formatCategoryName(categoryName || "");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">{displayName}</h1>
          <span className="text-gray-500 ml-2">({products.length} products)</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - hidden on mobile, visible on desktop */}
          <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-sm h-fit">
            <div className="pb-4 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h2>
            </div>
            
            <div className="py-4 border-b">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Under $25</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$25 - $50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$50 - $100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>$100 - $200</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Over $200</span>
                </label>
              </div>
            </div>
            
            <div className="py-4 border-b">
              <h3 className="font-medium mb-3">Customer Rating</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>4★ & above</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>3★ & above</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>2★ & above</span>
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="flipkart" className="w-full">Apply Filters</Button>
            </div>
          </div>
          
          <div className="flex-1">
            {/* Mobile filter buttons */}
            <div className="md:hidden flex gap-3 mb-4">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
              >
                <span>Sort By</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 relative group">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-contain mb-4" 
                      />
                    </Link>
                    <button 
                      className="absolute top-4 right-4 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-medium text-gray-800 hover:text-flipkart-blue transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="mt-1 mb-2">
                      <div className="flex items-center">
                        <span className="bg-green-700 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                          {product.rating} ★
                        </span>
                        <span className="text-gray-500 text-xs ml-2">
                          ({product.ratingCount})
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-baseline mt-2">
                      <span className="font-bold text-gray-800">{product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-gray-400 line-through text-sm ml-2">
                            {product.originalPrice}
                          </span>
                          <span className="text-green-600 text-sm ml-2">
                            {Math.round(
                              ((parseFloat(product.originalPrice.replace("$", "")) - 
                                parseFloat(product.price.replace("$", ""))) / 
                                parseFloat(product.originalPrice.replace("$", ""))) * 100
                            )}% off
                          </span>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      <ul className="list-disc pl-4 space-y-1">
                        {product.specs.map((spec, index) => (
                          <li key={index}>{spec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      variant="flipkart" 
                      className="w-full mt-4 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
