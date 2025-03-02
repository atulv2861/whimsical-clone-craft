
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { Filter, ShoppingCart, Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import Footer from "@/components/ecommerce/Footer";

// Mock data - in a real app this would come from API based on category
const allProducts = [
  {
    id: 1,
    name: "Smartphone X Pro",
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.5,
    ratingCount: 2547,
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["6.1\" Display", "128GB Storage", "48MP Camera"],
    category: "electronics"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.3,
    ratingCount: 1892,
    image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Noise Cancellation", "24h Battery", "Bluetooth 5.0"],
    category: "electronics"
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 89.99,
    originalPrice: 99.99,
    rating: 4.2,
    ratingCount: 942,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["Heart Rate Monitor", "Sleep Tracking", "5 ATM Water Resistant"],
    category: "electronics"
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 39.99,
    originalPrice: 59.99,
    rating: 3.9,
    ratingCount: 763,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["360° Sound", "IPX7 Waterproof", "12h Playtime"],
    category: "electronics"
  },
  {
    id: 5,
    name: "Wireless Charger",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.1,
    ratingCount: 512,
    image: "https://images.unsplash.com/photo-1622006578764-f291e24ae85a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["15W Fast Charging", "Multiple Device Support", "Sleep-Friendly LED"],
    category: "electronics"
  },
  {
    id: 6,
    name: "Power Bank 20000mAh",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.4,
    ratingCount: 1289,
    image: "https://images.unsplash.com/photo-1576541562591-7c8965783d1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    specs: ["20000mAh Capacity", "Fast Charging", "Multiple Ports"],
    category: "electronics"
  },
];

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { addToCart } = useCart();
  
  // State for filters
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Format category name for display
  const formatCategoryName = (name: string) => {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ") : "";
  };
  
  const displayName = formatCategoryName(categoryName || "");

  // Apply filters when they change
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Apply price filters
    if (priceFilters.length > 0) {
      filtered = filtered.filter(product => {
        return priceFilters.some(range => {
          switch(range) {
            case 'under25':
              return product.price < 25;
            case '25to50':
              return product.price >= 25 && product.price <= 50;
            case '50to100':
              return product.price > 50 && product.price <= 100;
            case '100to200':
              return product.price > 100 && product.price <= 200;
            case 'over200':
              return product.price > 200;
            default:
              return true;
          }
        });
      });
    }
    
    // Apply rating filter
    if (ratingFilter !== null) {
      filtered = filtered.filter(product => product.rating >= ratingFilter);
    }
    
    setFilteredProducts(filtered);
  }, [priceFilters, ratingFilter]);

  // Handle price filter changes
  const handlePriceFilterChange = (range: string) => {
    setPriceFilters(prev => {
      if (prev.includes(range)) {
        return prev.filter(item => item !== range);
      } else {
        return [...prev, range];
      }
    });
  };

  // Handle rating filter changes
  const handleRatingFilterChange = (rating: number) => {
    setRatingFilter(prev => prev === rating ? null : rating);
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Handle add to cart
  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">{displayName}</h1>
          <span className="text-gray-500 ml-2">({filteredProducts.length} products)</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - hidden on mobile, visible on desktop */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white p-4 rounded-lg shadow-sm h-fit`}>
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
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={priceFilters.includes('under25')}
                    onChange={() => handlePriceFilterChange('under25')}
                  />
                  <span>Under $25</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={priceFilters.includes('25to50')}
                    onChange={() => handlePriceFilterChange('25to50')}
                  />
                  <span>$25 - $50</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={priceFilters.includes('50to100')}
                    onChange={() => handlePriceFilterChange('50to100')}
                  />
                  <span>$50 - $100</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={priceFilters.includes('100to200')}
                    onChange={() => handlePriceFilterChange('100to200')}
                  />
                  <span>$100 - $200</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={priceFilters.includes('over200')}
                    onChange={() => handlePriceFilterChange('over200')}
                  />
                  <span>Over $200</span>
                </label>
              </div>
            </div>
            
            <div className="py-4 border-b">
              <h3 className="font-medium mb-3">Customer Rating</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={ratingFilter === 4}
                    onChange={() => handleRatingFilterChange(4)}
                  />
                  <span>4★ & above</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={ratingFilter === 3}
                    onChange={() => handleRatingFilterChange(3)}
                  />
                  <span>3★ & above</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={ratingFilter === 2}
                    onChange={() => handleRatingFilterChange(2)}
                  />
                  <span>2★ & above</span>
                </label>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="flipkart" 
                className="w-full"
                onClick={() => {
                  setPriceFilters([]);
                  setRatingFilter(null);
                  setIsFilterOpen(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            {/* Mobile filter buttons */}
            <div className="md:hidden flex gap-3 mb-4">
              <Button 
                variant="outline" 
                className="flex-1 flex items-center justify-center gap-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
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
              {filteredProducts.map((product) => (
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
                      <span className="font-bold text-gray-800">{formatPrice(product.price)}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-gray-400 line-through text-sm ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                          <span className="text-green-600 text-sm ml-2">
                            {Math.round(
                              ((product.originalPrice - product.price) / product.originalPrice) * 100
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
                      className="w-full mt-4 flex items-center justify-center"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      <span>Add to Cart</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-medium mb-2">No products match your filters</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filter criteria to see more products.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setPriceFilters([]);
                    setRatingFilter(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
