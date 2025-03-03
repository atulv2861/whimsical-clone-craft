
import React, { useState } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";
import { useNavigate } from "react-router-dom";
import { 
  PackageOpen, 
  RefreshCcw, 
  ChevronRight, 
  ChevronDown, 
  TruckIcon, 
  File, 
  MessageSquare,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Define types for the order items and orders
interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface DeliveryAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  paymentMethod: string;
  items: OrderItem[];
  deliveryAddress: DeliveryAddress;
  // Optional properties based on order status
  deliveryDate?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  cancellationReason?: string;
  refundStatus?: string;
}

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "ORD123456",
    date: "May 15, 2024",
    total: 129.99,
    status: "Delivered",
    deliveryDate: "May 18, 2024",
    paymentMethod: "Credit Card",
    items: [
      {
        id: 1,
        name: "Smartphone X Pro",
        quantity: 1,
        price: 129.99,
        image: "https://images.unsplash.com/photo-1592750475357-74d8a6c7bd3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 98765 43210"
    },
    trackingNumber: "TRKXYZ7890"
  },
  {
    id: "ORD789012",
    date: "May 2, 2024",
    total: 79.98,
    status: "Processing",
    estimatedDelivery: "May 25, 2024",
    paymentMethod: "UPI",
    items: [
      {
        id: 2,
        name: "Wireless Earbuds",
        quantity: 1,
        price: 49.99,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: 3,
        name: "Phone Case",
        quantity: 1,
        price: 29.99,
        image: "https://images.unsplash.com/photo-1642356558555-52d8617a3d2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 98765 43210"
    }
  },
  {
    id: "ORD345678",
    date: "April 15, 2024",
    total: 45.99,
    status: "Cancelled",
    cancellationReason: "Item out of stock",
    paymentMethod: "Net Banking",
    refundStatus: "Refunded",
    items: [
      {
        id: 4,
        name: "Bluetooth Speaker",
        quantity: 1,
        price: 45.99,
        image: "https://images.unsplash.com/photo-1564424224827-cd24b8915874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
    ],
    deliveryAddress: {
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 98765 43210"
    }
  }
];

const getStatusIcon = (status: string) => {
  switch(status) {
    case "Delivered":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "Processing":
      return <Clock className="h-5 w-5 text-blue-500" />;
    case "Shipped":
      return <TruckIcon className="h-5 w-5 text-blue-500" />;
    case "Cancelled":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "Pending":
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    default:
      return <ShoppingBag className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch(status) {
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Processing":
    case "Shipped":
      return "bg-blue-100 text-blue-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

const MyOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderDetailDialogOpen, setOrderDetailDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setOrderDetailDialogOpen(true);
  };

  const trackOrder = (order: Order) => {
    setSelectedOrder(order);
    setTrackingDialogOpen(true);
  };

  const buyAgain = (items: OrderItem[]) => {
    // In a real app, this would add the items to cart
    toast({
      title: "Items added to cart",
      description: `${items.length} item(s) have been added to your cart.`,
      duration: 3000,
    });
    navigate('/cart');
  };

  const cancelOrder = (orderId: string) => {
    // In a real app, this would call an API to cancel the order
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "Cancelled", cancellationReason: "Cancelled by user" } 
        : order
    );
    setOrders(updatedOrders);
    toast({
      title: "Order cancelled",
      description: `Order #${orderId} has been cancelled.`,
      duration: 3000,
    });
  };

  const writeReview = (item: OrderItem) => {
    // In a real app, this would open a review form for the specific item
    toast({
      title: "Write a review",
      description: `You can now write a review for ${item.name}.`,
      duration: 3000,
    });
    // Navigate to product page with review tab opened
    navigate(`/product/${item.id}?tab=reviews`);
  };

  const downloadInvoice = (orderId: string) => {
    // In a real app, this would download the invoice
    toast({
      title: "Invoice downloaded",
      description: `Invoice for order #${orderId} has been downloaded.`,
      duration: 3000,
    });
  };

  const contactSupport = (orderId: string) => {
    // In a real app, this would open a support chat or form
    toast({
      title: "Contact support",
      description: `Support ticket for order #${orderId} has been created.`,
      duration: 3000,
    });
  };

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-6" onValueChange={setFilter}>
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 px-6 py-4 flex flex-row items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Placed on {order.date} | {formatPrice(order.total)}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                        View Details
                      </DropdownMenuItem>
                      {order.status === "Processing" && (
                        <DropdownMenuItem onClick={() => cancelOrder(order.id)}>
                          Cancel Order
                        </DropdownMenuItem>
                      )}
                      {(order.status === "Delivered" || order.status === "Shipped") && (
                        <DropdownMenuItem onClick={() => trackOrder(order)}>
                          Track Order
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => downloadInvoice(order.id)}>
                        Download Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => contactSupport(order.id)}>
                        Contact Support
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    {order.items.slice(0, expandedOrder === order.id ? order.items.length : 1).map((item, index) => (
                      <div key={index} className="flex border-b pb-4 last:border-0 last:pb-0">
                        <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                          <div className="font-medium mt-1">{formatPrice(item.price)}</div>
                        </div>
                        {order.status === "Delivered" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 ml-2 whitespace-nowrap"
                            onClick={() => writeReview(item)}
                          >
                            <MessageSquare className="h-3 w-3" />
                            Review
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {order.items.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 text-blue-600"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      {expandedOrder === order.id ? "Show Less" : `+ ${order.items.length - 1} more item(s)`}
                    </Button>
                  )}
                </CardContent>
                
                <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between">
                  <div className="text-sm">
                    {order.status === "Delivered" && `Delivered on ${order.deliveryDate}`}
                    {order.status === "Processing" && `Estimated delivery by ${order.estimatedDelivery}`}
                    {order.status === "Cancelled" && 
                      <span className="text-red-600">
                        Cancelled: {order.cancellationReason}
                        {order.refundStatus && ` (${order.refundStatus})`}
                      </span>
                    }
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => viewOrderDetails(order)}
                    >
                      Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    {order.status === "Delivered" && (
                      <Button 
                        variant="default"
                        size="sm"
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
                        onClick={() => buyAgain(order.items)}
                      >
                        <RefreshCcw className="h-3 w-3" />
                        Buy Again
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <PackageOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-600 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place your first order, it will appear here</p>
            <Button 
              variant="default"
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
      
      {/* Order Details Dialog */}
      <Dialog open={orderDetailDialogOpen} onOpenChange={setOrderDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="py-4">
              <div className="flex justify-between items-start mb-4 pb-4 border-b">
                <div>
                  <h3 className="font-medium">Order #{selectedOrder.id}</h3>
                  <p className="text-sm text-gray-500">Placed on {selectedOrder.date}</p>
                </div>
                <Badge className={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex border rounded p-3">
                        <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                          <div className="font-medium mt-1">{formatPrice(item.price)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <div className="text-sm">
                      <p className="font-medium">{selectedOrder.deliveryAddress.name}</p>
                      <p>{selectedOrder.deliveryAddress.address}</p>
                      <p>
                        {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.state} - {selectedOrder.deliveryAddress.pincode}
                      </p>
                      <p>Phone: {selectedOrder.deliveryAddress.phone}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Payment Information</h3>
                    <div className="text-sm">
                      <p><span className="text-gray-600">Method:</span> {selectedOrder.paymentMethod}</p>
                      {selectedOrder.status === "Cancelled" && selectedOrder.refundStatus && (
                        <p><span className="text-gray-600">Refund Status:</span> {selectedOrder.refundStatus}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Items Total:</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between font-medium pt-1 border-t mt-1">
                      <span>Order Total:</span>
                      <span>{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6 pt-4 border-t">
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => downloadInvoice(selectedOrder.id)}
                >
                  <File className="h-4 w-4" />
                  Download Invoice
                </Button>
                
                <div className="flex gap-2">
                  {selectedOrder.status === "Processing" && (
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        cancelOrder(selectedOrder.id);
                        setOrderDetailDialogOpen(false);
                      }}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {["Delivered", "Shipped"].includes(selectedOrder.status) && selectedOrder.trackingNumber && (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setOrderDetailDialogOpen(false);
                        trackOrder(selectedOrder);
                      }}
                    >
                      Track Package
                    </Button>
                  )}
                  <Button 
                    variant="default"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => buyAgain(selectedOrder.items)}
                  >
                    Buy Again
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Tracking Dialog */}
      <Dialog open={trackingDialogOpen} onOpenChange={setTrackingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Track Your Order</DialogTitle>
          </DialogHeader>
          {selectedOrder && selectedOrder.trackingNumber && (
            <div className="py-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Order #{selectedOrder.id}</p>
                <p className="text-sm"><span className="font-medium">Tracking Number:</span> {selectedOrder.trackingNumber}</p>
              </div>
              
              <div className="relative pb-12">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                
                <div className="relative flex items-start mb-8">
                  <div className="absolute -left-1">
                    <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-14">
                    <h3 className="font-medium">Order Delivered</h3>
                    <p className="text-sm text-gray-500">{selectedOrder.deliveryDate}</p>
                    <p className="text-sm">Your order has been delivered.</p>
                  </div>
                </div>
                
                <div className="relative flex items-start mb-8">
                  <div className="absolute -left-1">
                    <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-14">
                    <h3 className="font-medium">Out For Delivery</h3>
                    <p className="text-sm text-gray-500">{selectedOrder.date}</p>
                    <p className="text-sm">Your order is out for delivery.</p>
                  </div>
                </div>
                
                <div className="relative flex items-start mb-8">
                  <div className="absolute -left-1">
                    <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-14">
                    <h3 className="font-medium">Shipped</h3>
                    <p className="text-sm text-gray-500">{selectedOrder.date}</p>
                    <p className="text-sm">Your order has been shipped.</p>
                  </div>
                </div>
                
                <div className="relative flex items-start">
                  <div className="absolute -left-1">
                    <div className="bg-blue-600 rounded-full h-10 w-10 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-14">
                    <h3 className="font-medium">Order Placed</h3>
                    <p className="text-sm text-gray-500">{selectedOrder.date}</p>
                    <p className="text-sm">Your order has been placed successfully.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setTrackingDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => contactSupport(selectedOrder?.id || "")}
            >
              Need Help?
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MyOrders;
