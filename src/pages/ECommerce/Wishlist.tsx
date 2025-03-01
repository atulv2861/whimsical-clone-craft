
import React from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  // This would typically fetch wishlist items from an API
  const wishlistItems = [
    {
      id: 1,
      name: "Smartphone X Pro",
      price: "$129.99",
      originalPrice: "$149.99",
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Smartphone",
      inStock: true,
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: "$49.99",
      originalPrice: "$69.99",
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Earbuds",
      inStock: true,
    },
    {
      id: 3,
      name: "Smart Watch Series 5",
      price: "$89.99",
      originalPrice: "$99.99",
      image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Watch",
      inStock: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="relative group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-48 object-contain p-4" 
                  />
                  <button 
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-flipkart-blue">
                    {item.name}
                  </Link>
                  <div className="flex items-center mt-1">
                    <span className="font-bold text-gray-800">{item.price}</span>
                    {item.originalPrice && (
                      <>
                        <span className="text-gray-400 line-through text-sm ml-2">
                          {item.originalPrice}
                        </span>
                        <span className="text-green-600 text-sm ml-2">
                          {Math.round(
                            ((parseFloat(item.originalPrice.replace("$", "")) - 
                              parseFloat(item.price.replace("$", ""))) / 
                              parseFloat(item.originalPrice.replace("$", ""))) * 100
                          )}% off
                        </span>
                      </>
                    )}
                  </div>
                  <div className="mt-4">
                    {item.inStock ? (
                      <Button 
                        variant="flipkart" 
                        className="w-full flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                        disabled
                      >
                        <span>Out of Stock</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-600 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love to your wishlist and they'll appear here</p>
            <Button 
              variant="flipkart"
              onClick={() => window.location.href = '/'}
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
