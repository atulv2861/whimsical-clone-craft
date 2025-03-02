
import React, { useState } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";
import { Button } from "@/components/ui/button";
import { User, MapPin, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Address = {
  id: number;
  fullName: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
  addressType: "home" | "work";
  isDefault: boolean;
};

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    gender: "male",
    birthday: "1990-01-01",
  });

  // Mock addresses
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      fullName: "John Doe",
      phone: "9876543210",
      pincode: "560001",
      locality: "MG Road",
      address: "123, ABC Apartments, XYZ Street",
      city: "Bangalore",
      state: "Karnataka",
      landmark: "Near Bus Stop",
      addressType: "home",
      isDefault: true,
    }
  ]);
  
  const [newAddress, setNewAddress] = useState<Omit<Address, "id" | "isDefault">>({
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
  
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddressId !== null) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddressId 
          ? { ...newAddress, id: addr.id, isDefault: addr.isDefault } 
          : addr
      ));
      toast({
        title: "Address Updated",
        description: "Your address has been successfully updated.",
      });
    } else {
      // Add new address
      const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
      setAddresses(prev => [...prev, { ...newAddress, id: newId, isDefault: prev.length === 0 }]);
      toast({
        title: "Address Added",
        description: "Your new address has been successfully added.",
      });
    }
    
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setNewAddress({
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
  };

  const handleEditAddress = (address: Address) => {
    setNewAddress({
      fullName: address.fullName,
      phone: address.phone,
      pincode: address.pincode,
      locality: address.locality,
      address: address.address,
      city: address.city,
      state: address.state,
      landmark: address.landmark,
      addressType: address.addressType,
    });
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast({
      title: "Address Deleted",
      description: "Your address has been successfully deleted.",
    });
  };

  const handleSetDefaultAddress = (id: number) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast({
      title: "Default Address Updated",
      description: "Your default address has been updated.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // In a real app, you would handle actual logout logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-flipkart-blue text-white p-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-white text-flipkart-blue flex items-center justify-center font-bold text-xl">
                    {userData.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{userData.name}</div>
                    <div className="text-sm opacity-90">{userData.email}</div>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <button
                  className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === "profile" ? "bg-blue-50 text-flipkart-blue" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-5 w-5 mr-3" />
                  Personal Information
                </button>
                
                <button
                  className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === "addresses" ? "bg-blue-50 text-flipkart-blue" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("addresses")}
                >
                  <MapPin className="h-5 w-5 mr-3" />
                  Manage Addresses
                </button>
                
                <button
                  className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === "payments" ? "bg-blue-50 text-flipkart-blue" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("payments")}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Payment Methods
                </button>
                
                <button
                  className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === "notifications" ? "bg-blue-50 text-flipkart-blue" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                
                <button
                  className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === "privacy" ? "bg-blue-50 text-flipkart-blue" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab("privacy")}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  Privacy Settings
                </button>
                
                <button
                  className="flex items-center w-full p-3 rounded-md text-left text-red-500 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">Personal Information</h2>
                
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleUserDataChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleUserDataChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleUserDataChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={userData.gender}
                        onChange={handleUserDataChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                      <input
                        type="date"
                        name="birthday"
                        value={userData.birthday}
                        onChange={handleUserDataChange}
                        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                    >
                      SAVE CHANGES
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium">Manage Addresses</h2>
                  {!isAddingAddress && (
                    <Button 
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                    >
                      + ADD NEW ADDRESS
                    </Button>
                  )}
                </div>
                
                {isAddingAddress ? (
                  <div className="border rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-3">
                      {editingAddressId !== null ? "Edit Address" : "Add New Address"}
                    </h3>
                    
                    <form onSubmit={handleAddAddress}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                          <input
                            type="text"
                            name="fullName"
                            value={newAddress.fullName}
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
                            value={newAddress.phone}
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
                            value={newAddress.pincode}
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
                            value={newAddress.locality}
                            onChange={handleAddressChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address (Area and Street)*</label>
                        <textarea
                          name="address"
                          value={newAddress.address}
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
                            value={newAddress.city}
                            onChange={handleAddressChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                          <select
                            name="state"
                            value={newAddress.state}
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
                          value={newAddress.landmark}
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
                              checked={newAddress.addressType === "home"}
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
                              checked={newAddress.addressType === "work"}
                              onChange={handleAddressChange}
                              className="mr-2"
                            />
                            Work
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsAddingAddress(false);
                            setEditingAddressId(null);
                            setNewAddress({
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
                          }}
                        >
                          CANCEL
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                        >
                          SAVE
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You don't have any saved addresses yet.</p>
                    <Button 
                      onClick={() => setIsAddingAddress(true)}
                      className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                    >
                      + ADD NEW ADDRESS
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map(address => (
                      <div key={address.id} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{address.fullName}</span>
                            <span className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded uppercase">
                              {address.addressType}
                            </span>
                            {address.isDefault && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded ml-2">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditAddress(address)}
                              className="text-flipkart-blue hover:underline text-sm"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteAddress(address.id)}
                              className="text-red-500 hover:underline text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-gray-600 mb-3">
                          <div>{address.address}</div>
                          <div>{address.locality ? `${address.locality}, ` : ''}{address.city}, {address.state} - {address.pincode}</div>
                          {address.landmark && <div>Landmark: {address.landmark}</div>}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-gray-600">
                            <span>Phone: </span>
                            <span>{address.phone}</span>
                          </div>
                          
                          {!address.isDefault && (
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-xs"
                            >
                              Set as Default
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === "payments" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">Payment Methods</h2>
                <p className="text-gray-500">You can manage your saved payment methods here.</p>
                
                <div className="border-t mt-4 pt-4">
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You don't have any saved payment methods yet.</p>
                    <Button 
                      className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                    >
                      + ADD PAYMENT METHOD
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">Notification Preferences</h2>
                <p className="text-gray-500 mb-4">Manage how you want to receive notifications.</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-sm text-gray-500">Receive notifications about your order status</p>
                    </div>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" checked readOnly />
                        Email
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" checked readOnly />
                        SMS
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">Promotions and Offers</h3>
                      <p className="text-sm text-gray-500">Stay updated with latest deals and discounts</p>
                    </div>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" checked readOnly />
                        Email
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        SMS
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">Product Recommendations</h3>
                      <p className="text-sm text-gray-500">Get personalized product suggestions</p>
                    </div>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" checked readOnly />
                        Email
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        SMS
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button 
                    className="bg-flipkart-blue hover:bg-flipkart-blue/90"
                  >
                    SAVE PREFERENCES
                  </Button>
                </div>
              </div>
            )}
            
            {/* Privacy Settings Tab */}
            {activeTab === "privacy" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">Privacy Settings</h2>
                <p className="text-gray-500 mb-4">Manage your privacy preferences.</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">Data Usage</h3>
                      <p className="text-sm text-gray-500">Allow us to use your browsing data to improve your experience</p>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="sr-only peer" checked readOnly />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-flipkart-blue peer-focus:ring-4 peer-focus:ring-blue-300">
                          <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:left-5"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">Marketing Communications</h3>
                      <p className="text-sm text-gray-500">Receive marketing communications from us</p>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="sr-only peer" checked readOnly />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-flipkart-blue peer-focus:ring-4 peer-focus:ring-blue-300">
                          <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:left-5"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-medium">Browsing History</h3>
                      <p className="text-sm text-gray-500">Store your browsing history for recommendations</p>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="sr-only peer" checked readOnly />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-flipkart-blue peer-focus:ring-4 peer-focus:ring-blue-300">
                          <div className="absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-all peer-checked:left-5"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    This will permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive"
                  >
                    DELETE ACCOUNT
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
