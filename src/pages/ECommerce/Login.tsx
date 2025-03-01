
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would connect to a backend for authentication
    toast({
      title: "Login Successful",
      description: "Welcome back to Flipkart!",
      duration: 3000,
    });
    navigate("/");
  };

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsOtpSent(true);
    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to ${mobileNumber}`,
      duration: 3000,
    });
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    toast({
      title: "Login Successful",
      description: "Welcome back to Flipkart!",
      duration: 3000,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-flipkart-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full grid grid-cols-1 md:grid-cols-5 shadow-lg rounded-sm">
        {/* Left Panel */}
        <div className="bg-flipkart-blue p-8 text-white md:col-span-2 hidden md:block rounded-l-sm">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <p className="text-gray-200 mb-8">Get access to your Orders, Wishlist and Recommendations</p>
          <img 
            src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
            alt="Login" 
            className="w-full mt-10 opacity-80"
          />
        </div>

        {/* Right Panel - Login Form */}
        <div className="bg-white p-8 md:col-span-3 rounded-r-sm">
          <div className="md:hidden mb-4">
            <h2 className="text-2xl font-bold text-flipkart-blue">Login</h2>
            <p className="text-gray-600">Get access to your Orders, Wishlist and Recommendations</p>
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-gray-600">
                  By continuing, you agree to Flipkart's{" "}
                  <Link to="/terms" className="text-flipkart-blue">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-flipkart-blue">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <Button 
                  type="submit" 
                  variant="flipkart" 
                  className="w-full"
                >
                  Login
                </Button>
                <div className="text-center">
                  <Link to="/forgot-password" className="text-flipkart-blue text-sm">
                    Forgot Password?
                  </Link>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="mobile">
              {!isOtpSent ? (
                <form onSubmit={handleRequestOtp} className="space-y-4">
                  <div>
                    <div className="flex items-center border border-gray-300 rounded">
                      <span className="px-3 text-gray-500">+91</span>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        className="flex-1 p-2 focus:outline-none"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    By continuing, you agree to Flipkart's{" "}
                    <Link to="/terms" className="text-flipkart-blue">
                      Terms of Use
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-flipkart-blue">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <Button 
                    type="submit" 
                    variant="flipkart" 
                    className="w-full"
                  >
                    Request OTP
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleOtpLogin} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      className="form-input"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={6}
                      required
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      OTP sent to {mobileNumber}
                      <button 
                        type="button"
                        className="text-flipkart-blue ml-2"
                        onClick={() => setIsOtpSent(false)}
                      >
                        Change
                      </button>
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    variant="flipkart" 
                    className="w-full"
                  >
                    Verify & Login
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-4 border-t text-center">
            <p className="text-gray-600">
              New to Flipkart?{" "}
              <Link to="/signup" className="text-flipkart-blue font-medium">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
