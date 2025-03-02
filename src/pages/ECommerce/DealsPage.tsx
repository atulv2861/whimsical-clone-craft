
import React, { useEffect } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { CategoriesTab } from "@/components/ecommerce/CategoriesTab";
import Footer from "@/components/ecommerce/Footer";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const featuredProducts = [
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
  { 
    id: 5, 
    name: "Samsung Galaxy Watch 4", 
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 19999, 
    originalPrice: 23999,
    rating: 4.6,
    discount: "16% off",
    inStock: true
  },
  { 
    id: 6, 
    name: "Samsung 108cm Smart TV", 
    image: "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 39990, 
    originalPrice: 49990,
    rating: 4.5,
    discount: "20% off",
    inStock: true
  },
  { 
    id: 7, 
    name: "Dell XPS 13", 
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 89990, 
    originalPrice: 99990,
    rating: 4.9,
    discount: "10% off",
    inStock: true
  },
  { 
    id: 8, 
    name: "Apple Watch Series 7", 
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 39990, 
    originalPrice: 44990,
    rating: 4.7,
    discount: "11% off",
    inStock: true
  },
  { 
    id: 9, 
    name: "Samsung Galaxy S21", 
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 69990, 
    originalPrice: 79990,
    rating: 4.6,
    discount: "12% off",
    inStock: true
  },
  { 
    id: 10, 
    name: "Bose QuietComfort Earbuds", 
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 22990, 
    originalPrice: 27990,
    rating: 4.8,
    discount: "18% off",
    inStock: true
  },
  { 
    id: 11, 
    name: "Canon EOS R5", 
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 339990, 
    originalPrice: 369990,
    rating: 4.9,
    discount: "8% off",
    inStock: true
  },
  { 
    id: 12, 
    name: "Nintendo Switch OLED", 
    image: "https://images.unsplash.com/photo-1662652095372-3ac8f2d3f304?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", 
    price: 34990, 
    originalPrice: 39990,
    rating: 4.7,
    discount: "12% off",
    inStock: true
  },
];

const DealsPage = () => {
  const { addToCart } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategoriesTab />
      <main className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Deals of the Day</h1>
            <p className="text-gray-600 mb-2">Top deals at amazing prices</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-lg shadow overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <div className="product-img-container h-40 md:h-48 flex items-center justify-center p-4 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="max-h-full object-contain product-img"
                    />
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium truncate mb-1">{product.name}</h3>
                    <div className="flex items-center mb-1">
                      <div className="bg-flipkart-green text-white text-xs px-1 py-0.5 rounded flex items-center">
                        {product.rating} <Star className="h-3 w-3 ml-0.5" fill="white" />
                      </div>
                      <span className="text-flipkart-darkgray text-xs ml-2">(1,024)</span>
                    </div>
                    <div>
                      <span className="text-flipkart-blue font-medium">{formatPrice(product.price)}</span>
                      <span className="text-gray-500 text-xs line-through ml-2">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-flipkart-green text-xs ml-2">{product.discount}</span>
                    </div>
                  </div>
                </Link>
                <div className="px-3 pb-3">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full bg-flipkart-yellow hover:bg-yellow-500 text-black flex items-center justify-center"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" /> ADD TO CART
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DealsPage;
