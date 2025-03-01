
import React, { useEffect } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { CategoriesTab } from "@/components/ecommerce/CategoriesTab";
import { Carousel } from "@/components/ui/carousel";
import { CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Heart, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/Button";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Mobiles", image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 2, name: "Fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 3, name: "Electronics", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 4, name: "Home", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 5, name: "Appliances", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 6, name: "Toys", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
];

const banners = [
  { id: 1, image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Sale Banner" },
  { id: 2, image: "https://images.unsplash.com/photo-1607083206325-caf1edba7a0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Electronics Sale" },
  { id: 3, image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", alt: "Fashion Sale" },
];

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
];

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Set up reveal animation for elements with reveal-item class
    const revealItems = document.querySelectorAll(".reveal-item");
    
    const revealOnScroll = () => {
      revealItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 60) {
          item.classList.add("is-revealed");
        }
      });
    };

    // Run once on load
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", revealOnScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, []);

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
      <CategoriesTab />
      <main className="flex-grow">
        {/* Hero Banner Carousel */}
        <section className="mb-4">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className="p-1">
                    <Card className="border-0">
                      <CardContent className="flex aspect-[16/5] items-center justify-center p-0 overflow-hidden">
                        <img 
                          src={banner.image} 
                          alt={banner.alt} 
                          className="w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </section>

        {/* Categories */}
        <section className="mb-8 container mx-auto px-4">
          <h2 className="section-title">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                to={`/category/${category.name.toLowerCase()}`} 
                key={category.id}
                className="category-card reveal-item"
              >
                <div className="w-16 h-16 md:w-24 md:h-24 mb-2 overflow-hidden rounded-full">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-center font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Deal of the Day */}
        <section className="mb-8 bg-white py-5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title m-0">Deal of the Day</h2>
              <Link to="/deals" className="text-flipkart-blue text-sm font-medium">
                VIEW ALL
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {featuredProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="product-card reveal-item">
                  <Link to={`/product/${product.id}`}>
                    <div className="product-img-container h-40 md:h-48 flex items-center justify-center p-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-h-full object-contain product-img"
                      />
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
                        <span className="price-tag">{formatPrice(product.price)}</span>
                        <span className="text-gray-500 text-xs line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="discount-tag">{product.discount}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="mb-8 bg-white py-5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <h2 className="section-title m-0">Trending Products</h2>
                <TrendingUp className="text-orange-500 ml-2" />
              </div>
              <Link to="/trending" className="text-flipkart-blue text-sm font-medium">
                VIEW ALL
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {featuredProducts.slice(2, 8).map((product) => (
                <div key={product.id} className="product-card reveal-item">
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
                        <span className="price-tag">{formatPrice(product.price)}</span>
                        <span className="text-gray-500 text-xs line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="discount-tag">{product.discount}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-3 pb-3">
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
          </div>
        </section>

        {/* Offers Banner */}
        <section className="mb-8 container mx-auto px-4">
          <div className="deal-banner rounded-md p-6 reveal-item">
            <h2 className="text-xl md:text-2xl font-bold mb-2">BIGGEST DEALS ON TOP BRANDS</h2>
            <p className="mb-4">Up to 80% off on Electronics, Fashion, and more</p>
            <Button variant="primary" size="lg" className="bg-white text-flipkart-blue hover:bg-gray-100">
              Shop Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-flipkart-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-400 font-medium mb-4 uppercase text-xs">ABOUT</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/careers" className="hover:underline">Careers</Link></li>
                <li><Link to="/stories" className="hover:underline">Flipkart Stories</Link></li>
                <li><Link to="/wholesale" className="hover:underline">Flipkart Wholesale</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400 font-medium mb-4 uppercase text-xs">HELP</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/payments" className="hover:underline">Payments</Link></li>
                <li><Link to="/shipping" className="hover:underline">Shipping</Link></li>
                <li><Link to="/returns" className="hover:underline">Returns & Refunds</Link></li>
                <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400 font-medium mb-4 uppercase text-xs">POLICY</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/return-policy" className="hover:underline">Return Policy</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms Of Use</Link></li>
                <li><Link to="/security" className="hover:underline">Security</Link></li>
                <li><Link to="/privacy" className="hover:underline">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-400 font-medium mb-4 uppercase text-xs">SOCIAL</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://facebook.com" className="hover:underline">Facebook</a></li>
                <li><a href="https://twitter.com" className="hover:underline">Twitter</a></li>
                <li><a href="https://youtube.com" className="hover:underline">YouTube</a></li>
                <li><a href="https://instagram.com" className="hover:underline">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6">
            <p className="text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Flipkart Clone. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
