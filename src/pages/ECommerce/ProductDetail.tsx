import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Star, ShoppingCart, Heart, Share2, TruckIcon, Shield, RotateCcw, Check, Pen } from "lucide-react";
import { Button } from "@/components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import Footer from "@/components/ecommerce/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const product = {
  id: 1,
  name: "Apple iPhone 13 (128GB) - Midnight",
  description: "15 cm (6.1-inch) Super Retina XDR display, Cinematic mode adds shallow depth of field and shifts focus automatically in your videos, Advanced dual-camera system with 12MP Wide and Ultra Wide cameras; Photographic Styles, Smart HDR 4, Night mode, 4K Dolby Vision HDR recording.",
  price: 59999,
  originalPrice: 69900,
  discount: "14% off",
  rating: 4.7,
  reviews: 23456,
  inStock: true,
  images: [
    "https://images.unsplash.com/photo-1592750475357-74d8a6c7bd3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  ],
  specifications: [
    { category: "General", specs: [
      { name: "Model Number", value: "iPhone 13" },
      { name: "Color", value: "Midnight" },
      { name: "SIM Type", value: "Dual Sim (Nano-SIM and eSIM)" }
    ]},
    { category: "Display", specs: [
      { name: "Size", value: "6.1 inches" },
      { name: "Resolution", value: "2532 x 1170 pixels at 460 ppi" },
      { name: "Type", value: "Super Retina XDR OLED" }
    ]},
    { category: "Performance", specs: [
      { name: "Processor", value: "A15 Bionic chip" },
      { name: "RAM", value: "4 GB" },
      { name: "Storage", value: "128 GB" }
    ]}
  ],
  features: ["Face ID", "5G connectivity", "Ceramic Shield", "Water resistant", "iOS 15"],
  seller: "Apple India",
  warranty: "1 Year Warranty"
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState<string | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: "",
    comment: "",
  });
  const { toast } = useToast();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0]
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0]
    });
    
    window.location.href = '/cart';
  };

  const handleAddToWishlist = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
      duration: 3000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing product: ${product.name}`,
        url: window.location.href,
      })
      .then(() => {
        toast({
          title: "Shared successfully",
          description: "Product has been shared.",
          duration: 3000,
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        handleCopyLink();
      });
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
      duration: 3000,
    });
  };

  const handleWriteReview = () => {
    setReviewDialogOpen(true);
  };

  const submitReview = () => {
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
      duration: 3000,
    });
    setReviewDialogOpen(false);
    setReviewData({
      rating: 5,
      title: "",
      comment: "",
    });
  };

  const checkDelivery = () => {
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      toast({
        title: "Invalid pincode",
        description: "Please enter a valid 6-digit pincode.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setDeliveryInfo("Loading...");
    setTimeout(() => {
      const isAvailable = Math.random() > 0.3;
      if (isAvailable) {
        setDeliveryInfo("Delivery available. Expected delivery in 2-3 days.");
      } else {
        setDeliveryInfo("Sorry, delivery not available in this area.");
      }
    }, 1000);
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col-reverse md:flex-row md:space-x-4">
              <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 mt-2 md:mt-0">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`border rounded p-1 cursor-pointer ${selectedImage === index ? 'border-flipkart-blue' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1 border rounded p-4 flex items-center justify-center relative">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="max-h-80 md:max-h-96 object-contain"
                />
                <button 
                  onClick={handleAddToWishlist}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                </button>
              </div>
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-medium mb-1">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-flipkart-green text-white text-sm px-1.5 py-0.5 rounded flex items-center">
                  {product.rating} <Star className="h-3 w-3 ml-0.5" fill="white" />
                </div>
                <span className="text-flipkart-darkgray text-sm">({product.reviews.toLocaleString()} ratings)</span>
              </div>
              <p className="text-flipkart-green font-medium mb-4">Special Price</p>
              <div className="flex items-center mb-1">
                <span className="text-flipkart-black text-2xl font-medium">{formatPrice(product.price)}</span>
                <span className="text-gray-500 text-sm line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-flipkart-green text-sm ml-2">{product.discount}</span>
              </div>
              <p className="text-xs text-gray-500 mb-6">inclusive of all taxes</p>

              <div className="bg-gray-50 p-4 rounded mb-6">
                <div className="flex items-start mb-4">
                  <TruckIcon className="h-5 w-5 text-gray-700 mt-0.5 mr-2" />
                  <div>
                    <h3 className="font-medium">Delivery</h3>
                    <div className="flex items-center mt-2">
                      <input 
                        type="text" 
                        placeholder="Enter pincode"
                        className="p-1.5 text-sm border rounded w-32 focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        maxLength={6}
                      />
                      <button 
                        className="text-flipkart-blue text-sm font-medium ml-2"
                        onClick={checkDelivery}
                      >
                        Check
                      </button>
                    </div>
                    {deliveryInfo && (
                      <p className="text-sm mt-1 text-gray-700">{deliveryInfo}</p>
                    )}
                    {!deliveryInfo && (
                      <p className="text-sm text-gray-500 mt-1">Usually delivered in 2 days</p>
                    )}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3 flex space-x-6">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-700 mr-1" />
                    <span className="text-xs">1 Year Warranty</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="h-4 w-4 text-gray-700 mr-1" />
                    <span className="text-xs">7 Days Replacement</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-gray-700 mr-1" />
                    <span className="text-xs">Genuine Product</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm">
                  <span className="text-gray-600">Seller: </span>
                  <span className="text-flipkart-blue font-medium">{product.seller}</span>
                </p>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-gray-600 mr-4">Quantity:</span>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    className="w-8 h-8 border rounded-l flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="w-10 h-8 border-t border-b flex items-center justify-center">
                    {quantity}
                  </div>
                  <button 
                    onClick={increaseQuantity}
                    className="w-8 h-8 border rounded-r flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="flex-1 bg-flipkart-yellow hover:bg-yellow-500 text-black inline-flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" /> ADD TO CART
                </Button>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="flex-1 bg-flipkart-blue hover:bg-blue-600 inline-flex items-center justify-center"
                  onClick={handleBuyNow}
                >
                  BUY NOW
                </Button>
              </div>

              <button 
                className="flex items-center text-gray-600 hover:text-flipkart-blue"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-1" /> Share
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b bg-transparent">
                <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-flipkart-blue rounded-none">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="data-[state=active]:border-b-2 data-[state=active]:border-flipkart-blue rounded-none">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-flipkart-blue rounded-none">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <h3 className="text-lg font-medium mb-4">Product Description</h3>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <h4 className="font-medium mb-2">Key Features</h4>
                <ul className="list-disc pl-5 text-gray-700">
                  {product.features.map((feature, index) => (
                    <li key={index} className="mb-1">{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specifications" className="pt-4">
                <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
                {product.specifications.map((category, index) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-medium mb-2 border-b pb-2">{category.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                      {category.specs.map((spec, i) => (
                        <div key={i} className="flex">
                          <span className="text-gray-600 w-40">{spec.name}</span>
                          <span className="text-gray-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <div className="flex items-center mb-4">
                  <div className="bg-flipkart-green text-white text-xl px-2 py-1 rounded flex items-center mr-4">
                    {product.rating} <Star className="h-4 w-4 ml-1" fill="white" />
                  </div>
                  <div>
                    <p className="font-medium">{product.reviews.toLocaleString()} ratings & reviews</p>
                    <p className="text-sm text-gray-500">Based on verified purchases</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleWriteReview}
                    className="flex items-center"
                  >
                    <Pen className="h-4 w-4 mr-2" />
                    Write a Review
                  </Button>
                </div>
                <div className="text-center py-8 text-gray-500">
                  <p>Reviews will appear here after customers start posting them.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="rating" className="text-sm font-medium">Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setReviewData({...reviewData, rating: star})}
                    className="focus:outline-none"
                  >
                    <Star 
                      className="h-6 w-6" 
                      fill={star <= reviewData.rating ? "#FFB800" : "none"} 
                      color={star <= reviewData.rating ? "#FFB800" : "#D1D5DB"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="title" className="text-sm font-medium">Review Title</label>
              <input
                id="title"
                value={reviewData.title}
                onChange={(e) => setReviewData({...reviewData, title: e.target.value})}
                className="border p-2 rounded-md"
                placeholder="Summarize your experience"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="comment" className="text-sm font-medium">Your Review</label>
              <textarea
                id="comment"
                value={reviewData.comment}
                onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                className="border p-2 rounded-md"
                rows={4}
                placeholder="What did you like or dislike about this product?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="flipkart" 
              onClick={submitReview} 
              disabled={!reviewData.comment || !reviewData.title}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;
