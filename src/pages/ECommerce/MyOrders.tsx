
import React from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { PackageOpen, RefreshCcw } from "lucide-react";

const MyOrders = () => {
  // This would typically fetch orders from an API
  const orders = [
    {
      id: "ORD123456",
      date: "May 15, 2024",
      total: "$129.99",
      status: "Delivered",
      items: [
        {
          name: "Smartphone X Pro",
          quantity: 1,
          price: "$129.99",
        },
      ],
    },
    {
      id: "ORD789012",
      date: "May 2, 2024",
      total: "$79.98",
      status: "Processing",
      items: [
        {
          name: "Wireless Earbuds",
          quantity: 1,
          price: "$49.99",
        },
        {
          name: "Phone Case",
          quantity: 1,
          price: "$29.99",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">{order.total}</p>
                </div>
                
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <PackageOpen className="h-4 w-4" />
                    <span>Track Order</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    <span>Buy Again</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <PackageOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place your first order, it will appear here</p>
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

export default MyOrders;
