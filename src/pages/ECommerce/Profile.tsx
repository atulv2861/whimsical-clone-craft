
import React from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import { Button } from "@/components/Button";
import { User, Mail, Phone, MapPin, Edit2, Camera } from "lucide-react";

const Profile = () => {
  // Mock user data - in a real app this would come from an API or auth state
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    joinDate: "January 2022",
    profileImage: null, // null represents no custom image
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md">
          <div className="bg-flipkart-blue rounded-t-lg p-6">
            <div className="flex items-center">
              <div className="relative">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border-4 border-white">
                    <User className="h-12 w-12 text-flipkart-blue" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md">
                  <Camera className="h-4 w-4 text-flipkart-blue" />
                </button>
              </div>
              <div className="ml-6 text-white">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-blue-100">Member since {user.joinDate}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Personal Information</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Personal Info</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Address</h3>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p>{user.address}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Manage Addresses</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8">
              <h3 className="font-medium text-lg mb-4">Account Settings</h3>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                >
                  Change Password
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                >
                  Privacy Settings
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
