
import React, { useState } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { useCart } from "@/contexts/CartContext";
import { 
  CreditCard, CheckCircle, MapPin, Truck, Calendar, 
  AlertCircle, Home, Building, PlusCircle, Edit, Trash2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/ecommerce/Footer";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, subtotal, discount, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      address: "123 Main Street, Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      isDefault: true,
      type: "home" as const
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "upi">("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddressSelect = (id: number) => {
    setSelectedAddressId(id);
  };

  const handlePaymentMethodSelect = (method: "card" | "cod" | "upi") => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // In a real app, this would handle payment processing and order creation
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
      duration: 5000,
    });
    
    // Clear cart and redirect to a success page or order history
    clearCart();
    setTimeout(() => navigate("/my-orders"), 1500);
  };

  const isStepComplete = (currentStep: number) => {
    if (currentStep === 1) {
      return selectedAddressId !== 0;
    }
    if (currentStep === 2) {
      if (paymentMethod === "card") {
        return cardDetails.number && cardDetails.name && cardDetails.expiry && cardDetails.cvv;
      }
      if (paymentMethod === "upi") {
        return upiId.length > 0;
      }
      return true; // For COD
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 px-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3500/3500855.png" 
              alt="Empty Cart" 
              className="h-24 mx-auto mb-4 opacity-70"
            />
            <h2 className="text-xl font-medium mb-2">Your cart is empty!</h2>
            <p className="text-gray-500 mb-6">Add items to your cart to checkout</p>
            <Link to="/">
              <Button variant="flipkart">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Checkout Steps Container */}
            <div className="lg:col-span-2">
              {/* Progress Indicator */}
              <div className="bg-white rounded shadow p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-flipkart-blue text-white' : 'bg-gray-200'} flex items-center justify-center mb-1`}>
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium">Address</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-flipkart-blue' : 'bg-gray-200'}`}></div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-flipkart-blue text-white' : 'bg-gray-200'} flex items-center justify-center mb-1`}>
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium">Payment</span>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-flipkart-blue' : 'bg-gray-200'}`}></div>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-flipkart-blue text-white' : 'bg-gray-200'} flex items-center justify-center mb-1`}>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium">Confirmation</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Delivery Address */}
              {step === 1 && (
                <div className="bg-white rounded shadow p-4 mb-6">
                  <h2 className="text-lg font-medium mb-4">Delivery Address</h2>
                  
                  <div className="space-y-4">
                    {addresses.map(address => (
                      <div 
                        key={address.id} 
                        className={`border p-3 rounded ${selectedAddressId === address.id ? 'border-flipkart-blue bg-blue-50' : 'border-gray-200'}`}
                      >
                        <div className="flex items-start">
                          <input 
                            type="radio" 
                            name="address" 
                            id={`address-${address.id}`}
                            checked={selectedAddressId === address.id}
                            onChange={() => handleAddressSelect(address.id)}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center">
                                <p className="font-medium">{address.name}</p>
                                <span className={`ml-2 text-xs px-2 py-0.5 rounded ${address.type === 'home' ? 'bg-flipkart-blue text-white' : 'bg-yellow-100 text-yellow-800'}`}>
                                  {address.type === 'home' ? 'HOME' : 'WORK'}
                                </span>
                                {address.isDefault && (
                                  <span className="ml-2 text-xs text-gray-500">Default</span>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button className="text-flipkart-blue">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="text-red-500">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{address.phone}</p>
                            <p className="text-sm text-gray-700 mt-1">
                              {address.address}, {address.city}, {address.state} - {address.pincode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border border-dashed border-gray-300 p-3 rounded">
                      <div className="flex items-center text-flipkart-blue cursor-pointer">
                        <PlusCircle className="h-5 w-5 mr-2" />
                        <span>Add a new address</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="flipkart"
                      disabled={!isStepComplete(1)}
                      onClick={() => setStep(2)}
                    >
                      DELIVER TO THIS ADDRESS
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Options */}
              {step === 2 && (
                <div className="bg-white rounded shadow p-4 mb-6">
                  <h2 className="text-lg font-medium mb-4">Payment Options</h2>
                  
                  <div className="space-y-4">
                    {/* Credit/Debit Card */}
                    <div className="border rounded">
                      <div 
                        className={`p-3 flex items-center cursor-pointer ${paymentMethod === 'card' ? 'border-l-4 border-l-flipkart-blue' : ''}`}
                        onClick={() => handlePaymentMethodSelect('card')}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={paymentMethod === 'card'}
                          onChange={() => handlePaymentMethodSelect('card')}
                          className="mr-3"
                        />
                        <CreditCard className="h-5 w-5 mr-2 text-gray-600" />
                        <span>Credit / Debit Card</span>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="p-4 border-t">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                              <input 
                                type="text" 
                                name="number"
                                value={cardDetails.number}
                                onChange={handleCardDetailsChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Name on Card</label>
                              <input 
                                type="text" 
                                name="name"
                                value={cardDetails.name}
                                onChange={handleCardDetailsChange}
                                placeholder="John Doe"
                                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                              />
                            </div>
                            <div className="flex space-x-4">
                              <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">Valid Until</label>
                                <input 
                                  type="text" 
                                  name="expiry"
                                  value={cardDetails.expiry}
                                  onChange={handleCardDetailsChange}
                                  placeholder="MM/YY"
                                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                                />
                              </div>
                              <div className="w-24">
                                <label className="block text-sm text-gray-600 mb-1">CVV</label>
                                <input 
                                  type="password" 
                                  name="cvv"
                                  value={cardDetails.cvv}
                                  onChange={handleCardDetailsChange}
                                  placeholder="***"
                                  maxLength={3}
                                  className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* UPI */}
                    <div className="border rounded">
                      <div 
                        className={`p-3 flex items-center cursor-pointer ${paymentMethod === 'upi' ? 'border-l-4 border-l-flipkart-blue' : ''}`}
                        onClick={() => handlePaymentMethodSelect('upi')}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={paymentMethod === 'upi'}
                          onChange={() => handlePaymentMethodSelect('upi')}
                          className="mr-3"
                        />
                        <span className="w-5 h-5 text-center mr-2 text-gray-600 font-bold">₹</span>
                        <span>UPI</span>
                      </div>
                      
                      {paymentMethod === 'upi' && (
                        <div className="p-4 border-t">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">UPI ID</label>
                            <input 
                              type="text" 
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="username@upi"
                              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            You'll receive a payment request on your UPI app.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Cash on Delivery */}
                    <div className="border rounded">
                      <div 
                        className={`p-3 flex items-center cursor-pointer ${paymentMethod === 'cod' ? 'border-l-4 border-l-flipkart-blue' : ''}`}
                        onClick={() => handlePaymentMethodSelect('cod')}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          checked={paymentMethod === 'cod'}
                          onChange={() => handlePaymentMethodSelect('cod')}
                          className="mr-3"
                        />
                        <Truck className="h-5 w-5 mr-2 text-gray-600" />
                        <span>Cash on Delivery</span>
                      </div>
                      
                      {paymentMethod === 'cod' && (
                        <div className="p-4 border-t">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700">
                              Pay using cash when your order is delivered. Due to COVID safety, we recommend paying 
                              using a contactless method.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      BACK
                    </Button>
                    <Button
                      variant="flipkart"
                      disabled={!isStepComplete(2)}
                      onClick={() => setStep(3)}
                    >
                      CONTINUE
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Summary and Confirmation */}
              {step === 3 && (
                <div className="bg-white rounded shadow p-4 mb-6">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="border-b pb-4 mb-4">
                    {/* Delivery Details */}
                    <div className="flex items-start mb-4">
                      <MapPin className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium mb-1">Delivery Address</h3>
                        {addresses.map(address => {
                          if (address.id === selectedAddressId) {
                            return (
                              <div key={address.id}>
                                <p className="text-sm">{address.name}, {address.phone}</p>
                                <p className="text-sm text-gray-700">
                                  {address.address}, {address.city}, {address.state} - {address.pincode}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                    
                    {/* Payment Details */}
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-gray-600 mt-0.5 mr-3" />
                      <div>
                        <h3 className="font-medium mb-1">Payment Method</h3>
                        <p className="text-sm">
                          {paymentMethod === 'card' && 'Credit/Debit Card'}
                          {paymentMethod === 'upi' && 'UPI'}
                          {paymentMethod === 'cod' && 'Cash on Delivery'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="border-b pb-4 mb-4">
                    <h3 className="font-medium mb-3">Items ({cartItems.length})</h3>
                    
                    <div className="space-y-3">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex">
                          <div className="w-16 h-16">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Estimate */}
                  <div className="flex items-center mb-6">
                    <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Estimated Delivery</p>
                      <p className="text-sm text-gray-700">
                        {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      BACK
                    </Button>
                    <Button
                      variant="flipkart"
                      onClick={handlePlaceOrder}
                    >
                      PLACE ORDER
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Summary */}
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
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
