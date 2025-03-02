
import React, { useState } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import Footer from "@/components/ecommerce/Footer";

const Wishlist = () => {
  // This would typically fetch wishlist items from an API
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Smartphone X Pro",
      price: 129.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      inStock: true,
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      inStock: true,
    },
    {
      id: 3,
      name: "Smart Watch Series 5",
      price: 89.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      inStock: false,
    },
  ]);

  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
      duration: 3000,
    });
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image
    });
  };

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
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-flipkart-blue">
                    {item.name}
                  </Link>
                  <div className="flex items-center mt-1">
                    <span className="font-bold text-gray-800">${item.price}</span>
                    {item.originalPrice && (
                      <>
                        <span className="text-gray-400 line-through text-sm ml-2">
                          ${item.originalPrice}
                        </span>
                        <span className="text-green-600 text-sm ml-2">
                          {Math.round(
                            ((item.originalPrice - item.price) / item.originalPrice) * 100
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
                        onClick={() => handleAddToCart(item)}
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
      <Footer />
    </div>
  );
};

export default Wishlist;
