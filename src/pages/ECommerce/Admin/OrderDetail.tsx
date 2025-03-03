
import React, { useState } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";
import { Button } from "@/components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Printer, Mail, Package, Truck, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStatus, setCurrentStatus] = useState("Processing");
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock order data
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString(),
    customer: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+91 98765 43210",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    subtotal: 6000,
    shipping: 0,
    tax: 600,
    total: 6600,
    address: {
      line1: "123 Main Street",
      line2: "Apartment 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    items: [
      { id: 1, name: "Smartphone X", price: 4000, quantity: 1, image: "https://source.unsplash.com/random/100x100/?smartphone" },
      { id: 2, name: "Wireless Earbuds", price: 2000, quantity: 1, image: "https://source.unsplash.com/random/100x100/?earbuds" }
    ]
  };

  const handleUpdateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus);
    toast({
      title: "Order Status Updated",
      description: `Order status changed to ${newStatus}`,
    });
  };

  const handlePrintInvoice = () => {
    toast({
      title: "Printing Invoice",
      description: "Invoice sent to printer",
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: `Order update email sent to ${order.email}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => navigate("/admin/orders")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
          </Button>
          <h1 className="text-2xl font-bold">Order Details: {order.id}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Order Status</h2>
                  <p className="text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
                </div>
                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Button onClick={handlePrintInvoice} variant="outline">
                    <Printer className="h-4 w-4 mr-2" /> Print Invoice
                  </Button>
                  <Button onClick={handleSendEmail}>
                    <Mail className="h-4 w-4 mr-2" /> Send Email
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
                  <div 
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-flipkart-blue ${
                      currentStatus === "Pending" ? "w-1/4" : 
                      currentStatus === "Processing" ? "w-2/4" : 
                      currentStatus === "Shipped" ? "w-3/4" : "w-full"
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <div className="text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStatus === "Pending" || currentStatus === "Processing" || currentStatus === "Shipped" || currentStatus === "Delivered" ? "bg-flipkart-blue text-white" : "bg-gray-200"}`}>
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="text-xs mt-1">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStatus === "Processing" || currentStatus === "Shipped" || currentStatus === "Delivered" ? "bg-flipkart-blue text-white" : "bg-gray-200"}`}>
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="text-xs mt-1">Processing</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStatus === "Shipped" || currentStatus === "Delivered" ? "bg-flipkart-blue text-white" : "bg-gray-200"}`}>
                      <Truck className="h-5 w-5" />
                    </div>
                    <div className="text-xs mt-1">Shipped</div>
                  </div>
                  <div className="text-center">
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${currentStatus === "Delivered" ? "bg-flipkart-blue text-white" : "bg-gray-200"}`}>
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="text-xs mt-1">Delivered</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={currentStatus === "Pending" ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleUpdateStatus("Pending")}
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={currentStatus === "Processing" ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleUpdateStatus("Processing")}
                  >
                    Processing
                  </Button>
                  <Button 
                    variant={currentStatus === "Shipped" ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleUpdateStatus("Shipped")}
                  >
                    Shipped
                  </Button>
                  <Button 
                    variant={currentStatus === "Delivered" ? "primary" : "outline"} 
                    size="sm"
                    onClick={() => handleUpdateStatus("Delivered")}
                  >
                    Delivered
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="divide-y">
                {order.items.map(item => (
                  <div key={item.id} className="py-4 flex">
                    <div className="h-20 w-20 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-md font-medium">{item.name}</h3>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-gray-500">Unit Price: {formatCurrency(item.price)}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0 font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{order.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{order.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{order.phone}</p>
                </div>
              </div>
            </div>
            
            {/* Shipping Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div>
                <p>{order.address.line1}</p>
                {order.address.line2 && <p>{order.address.line2}</p>}
                <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
                <p>{order.address.country}</p>
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className="font-medium">{order.paymentStatus}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-medium">{formatCurrency(order.subtotal)}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Shipping</p>
                  <p className="font-medium">{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Tax</p>
                  <p className="font-medium">{formatCurrency(order.tax)}</p>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <p className="font-bold">Total</p>
                  <p className="font-bold">{formatCurrency(order.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetail;
