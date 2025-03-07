
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShieldCheck, TruckIcon } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Footer from "@/components/ecommerce/Footer";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, discount, total } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-flipkart-gray">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded shadow p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">My Cart ({cartItems.length})</h2>
                {cartItems.length > 0 && (
                  <div>
                    <span className="text-gray-500">Deliver to:</span>
                    <select className="ml-2 border-b border-gray-300 bg-transparent focus:outline-none text-sm">
                      <option>Bangalore - 560001</option>
                      <option>Mumbai - 400001</option>
                      <option>Delhi - 110001</option>
                    </select>
                  </div>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <img 
                    src="https://images.unsplash.com/photo-1628102491629-778571d893a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                    alt="Empty Cart" 
                    className="h-40 mx-auto mb-4 opacity-70"
                  />
                  <h3 className="text-xl mb-2">Your cart is empty!</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                  <Link to="/">
                    <Button variant="default" className="bg-flipkart-blue hover:bg-flipkart-blue/90">Shop Now</Button>
                  </Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b pb-4 mb-4">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 h-24 mr-4 flex-shrink-0 mb-2 sm:mb-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <Link to={`/product/${item.id}`} className="text-gray-800 hover:text-flipkart-blue font-medium">
                            {item.name}
                          </Link>
                          <div className="text-sm text-gray-500 mb-2">Seller: Retailer</div>
                          <div className="flex items-baseline mb-3">
                            <span className="font-medium">{formatPrice(item.price)}</span>
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {formatPrice(item.originalPrice)}
                            </span>
                            <span className="text-flipkart-green text-sm ml-2">
                              {Math.round((item.originalPrice - item.price) / item.originalPrice * 100)}% off
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 border rounded-l"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                className="w-10 text-center border-t border-b h-8"
                                readOnly
                              />
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 border rounded-r"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-500 hover:text-flipkart-blue flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleCheckout}
                      className="mt-2 bg-flipkart-blue hover:bg-flipkart-blue/90 flex items-center"
                    >
                      PLACE ORDER
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Price Summary Section */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded shadow p-4 sticky top-20">
                <h2 className="text-gray-500 font-medium uppercase text-sm mb-4">PRICE DETAILS</h2>
                <div className="space-y-3 pb-3 border-b border-dashed">
                  <div className="flex justify-between">
                    <span>Price ({cartItems.length} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span className="text-flipkart-green">- {formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-flipkart-green">FREE</span>
                  </div>
                </div>
                <div className="flex justify-between font-medium py-3 border-b border-dashed">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="text-flipkart-green font-medium py-3">
                  You will save {formatPrice(discount)} on this order
                </div>

                {/* Safe and Secure Payments */}
                <div className="mt-4 pt-4 border-t flex items-center">
                  <ShieldCheck className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">Safe and Secure Payments</span>
                </div>
                <div className="mt-2 flex items-center">
                  <TruckIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">Free delivery on all orders</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
