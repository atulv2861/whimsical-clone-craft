
import React, { useState } from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/ecommerce/Footer";
import { User, Bell, Lock, MapPin, CreditCard, LogOut, CheckCircle } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    gender: "male",
    birthday: "1990-01-01"
  });

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
      type: "home"
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      cardNumber: "**** **** **** 1234",
      cardType: "visa",
      expiryDate: "12/25",
      isDefault: true
    }
  ]);

  const [notificationPreferences, setNotificationPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    priceDrops: false,
    newOffers: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationPreferences(prev => ({ ...prev, [name]: checked }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
      duration: 3000,
    });
  };

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirm password must match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // In a real app, would call API to update password
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
      duration: 3000,
    });
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
      duration: 3000,
    });
  };

  const handleAddAddress = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add new addresses will be available soon.",
      duration: 3000,
    });
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add new payment methods will be available soon.",
      duration: 3000,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    
    // In a real app, would handle logout logic
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          
          <Tabs defaultValue="profile" className="bg-white rounded-lg shadow">
            <div className="flex border-b">
              <div className="w-48 p-4 border-r bg-gray-50 rounded-tl-lg">
                <TabsList className="flex flex-col space-y-1 w-full bg-transparent">
                  <TabsTrigger 
                    value="profile" 
                    className="justify-start w-full px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-flipkart-blue rounded-md"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="addresses" 
                    className="justify-start w-full px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-flipkart-blue rounded-md"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Addresses
                  </TabsTrigger>
                  <TabsTrigger 
                    value="payments" 
                    className="justify-start w-full px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-flipkart-blue rounded-md"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="justify-start w-full px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-flipkart-blue rounded-md"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="password" 
                    className="justify-start w-full px-2 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-flipkart-blue rounded-md"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-8">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-6">
                <TabsContent value="profile" className="mt-0">
                  <h2 className="text-xl font-medium mb-4">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        name="gender"
                        value={profileData.gender}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not_to_say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        name="birthday"
                        value={profileData.birthday}
                        onChange={handleProfileChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="flipkart" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="addresses" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Saved Addresses</h2>
                    <Button variant="outline" size="sm" onClick={handleAddAddress}>
                      Add New Address
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {addresses.map(address => (
                      <div key={address.id} className="border rounded p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{address.name}</h3>
                              <span className={`ml-2 text-xs px-2 py-0.5 rounded ${address.type === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {address.type.toUpperCase()}
                              </span>
                              {address.isDefault && (
                                <span className="ml-2 text-xs flex items-center text-green-600">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                            <p className="text-sm mt-2">
                              {address.address}, {address.city}, {address.state} - {address.pincode}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="payments" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Saved Payment Methods</h2>
                    <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
                      Add New Card
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div key={method.id} className="border rounded p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{method.cardType.toUpperCase()} Card</h3>
                              {method.isDefault && (
                                <span className="ml-2 text-xs flex items-center text-green-600">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{method.cardNumber}</p>
                            <p className="text-sm mt-1">Expires: {method.expiryDate}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <h2 className="text-xl font-medium mb-4">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Order Updates</h3>
                        <p className="text-sm text-gray-600">Receive notifications about your order status</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="orderUpdates"
                          checked={notificationPreferences.orderUpdates} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-flipkart-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Promotions and Offers</h3>
                        <p className="text-sm text-gray-600">Get notified about deals and discounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="promotions"
                          checked={notificationPreferences.promotions} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-flipkart-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Price Drops</h3>
                        <p className="text-sm text-gray-600">Get alerts when prices drop on items in your wishlist</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="priceDrops"
                          checked={notificationPreferences.priceDrops} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-flipkart-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">New Offers</h3>
                        <p className="text-sm text-gray-600">Get notifications about new offers and seasonal sales</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          name="newOffers"
                          checked={notificationPreferences.newOffers} 
                          onChange={handleNotificationChange}
                          className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-flipkart-blue"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button variant="flipkart" onClick={handleSaveNotifications}>
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="password" className="mt-0">
                  <h2 className="text-xl font-medium mb-4">Change Password</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters long
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-flipkart-blue"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      variant="flipkart" 
                      onClick={handleSavePassword}
                      disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    >
                      Update Password
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
