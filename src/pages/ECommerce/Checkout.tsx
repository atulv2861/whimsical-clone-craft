
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Check, MapPin, CreditCard, Truck, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { cartItems, subtotal, discount, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Address form state
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    addressType: "home",
  });

  // Payment info state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.pincode || !address.address || !address.city || !address.state) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "card") {
      if (!paymentInfo.cardNumber || !paymentInfo.nameOnCard || !paymentInfo.expiry || !paymentInfo.cvv) {
        toast({
          title: "Error",
          description: "Please fill in all card details",
          variant: "destructive",
        });
        return;
      }
    }
    processPayment();
  };

  const processPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Order Placed!",
        description: "Your order has been successfully placed.",
      });
      clearCart();
      navigate("/my-orders");
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Checkout steps */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center rounded-full w-8 h-8 ${step >= 1 ? 'bg-flipkart-blue text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step > 1 ? <Check className="h-5 w-5" /> : 1}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Delivery Address</h3>
                  </div>
                </div>
              </div>
              
              {step === 1 && (
                <form onSubmit={handleAddressSubmit} className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                      <input
                        type="text"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleAddressChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                      <input
                        type="tel"
                        name="phone"
                        value={address.phone}
                        onChange={handleAddressChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode*</label>
                      <input
                        type="text"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleAddressChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                      <input
                        type="text"
                        name="locality"
                        value={address.locality}
                        onChange={handleAddressChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address (Area and Street)*</label>
                    <textarea
                      name="address"
                      value={address.address}
                      onChange={handleAddressChange}
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City/District/Town*</label>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                      <select
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={address.landmark}
                      onChange={handleAddressChange}
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="addressType"
                          value="home"
                          checked={address.addressType === "home"}
                          onChange={handleAddressChange}
                          className="mr-2"
                        />
                        Home
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="addressType"
                          value="work"
                          checked={address.addressType === "work"}
                          onChange={handleAddressChange}
                          className="mr-2"
                        />
                        Work
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                    >
                      CONTINUE
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Payment Step */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center rounded-full w-8 h-8 ${step >= 2 ? 'bg-flipkart-blue text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step > 2 ? <Check className="h-5 w-5" /> : 2}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Payment Method</h3>
                  </div>
                </div>
              </div>
              
              {step === 2 && (
                <form onSubmit={handlePaymentSubmit} className="p-5">
                  <div className="mb-5">
                    <div className="mb-2">
                      <label className="flex items-center mb-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="mr-2"
                        />
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </label>
                      
                      {paymentMethod === "card" && (
                        <div className="pl-6 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={handlePaymentInfoChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                            <input
                              type="text"
                              name="nameOnCard"
                              value={paymentInfo.nameOnCard}
                              onChange={handlePaymentInfoChange}
                              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until (MM/YY)</label>
                              <input
                                type="text"
                                name="expiry"
                                value={paymentInfo.expiry}
                                onChange={handlePaymentInfoChange}
                                placeholder="MM/YY"
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                              <input
                                type="password"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handlePaymentInfoChange}
                                maxLength={3}
                                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <label className="flex items-center mb-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="mr-2"
                      />
                      UPI
                    </label>
                    
                    <label className="flex items-center mb-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={() => setPaymentMethod("netbanking")}
                        className="mr-2"
                      />
                      Net Banking
                    </label>
                    
                    <label className="flex items-center mb-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="mr-2"
                      />
                      Cash on Delivery
                    </label>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      BACK
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Processing..." : "PLACE ORDER"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <h2 className="font-medium border-b pb-2 mb-3">Order Summary</h2>
              
              <div className="max-h-60 overflow-y-auto mb-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex py-2 border-b">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="text-sm line-clamp-1">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="ml-2 font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 text-sm border-b pb-3 mb-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-flipkart-green">- {formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-flipkart-green">FREE</span>
                </div>
              </div>
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="text-xs text-gray-500 mb-2">Delivery Address:</div>
                {step > 1 && (
                  <div className="text-sm">
                    <div className="font-medium">{address.fullName}</div>
                    <div>{address.address}</div>
                    <div>{address.locality ? `${address.locality}, ` : ''}{address.city}, {address.state} - {address.pincode}</div>
                    <div>Phone: {address.phone}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
