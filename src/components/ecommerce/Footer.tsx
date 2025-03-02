
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Shield, HelpCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-flipkart-blue py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-white text-xl font-medium mb-2">Subscribe to our newsletter</h3>
              <p className="text-blue-100">Stay updated with new offers and products</p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow py-3 px-4 outline-none rounded-l-md"
                />
                <button className="bg-flipkart-yellow hover:bg-yellow-500 text-black px-6 py-3 rounded-r-md font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="text-flipkart-blue font-bold italic text-2xl tracking-tight">
                Flipkart
              </div>
              <div className="flex flex-col text-xs ml-1">
                <span className="text-flipkart-blue italic font-light">Explore</span>
                <span className="text-yellow-500 italic font-light">Plus</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-4">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103, Karnataka, India
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="/about" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <Facebook size={20} className="text-flipkart-blue" />
              </a>
              <a href="/about" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <Twitter size={20} className="text-flipkart-blue" />
              </a>
              <a href="/about" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <Instagram size={20} className="text-flipkart-blue" />
              </a>
              <a href="/about" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                <Youtube size={20} className="text-flipkart-blue" />
              </a>
            </div>
            <div className="flex items-center mb-2">
              <Mail size={18} className="text-gray-600 mr-2" />
              <span className="text-gray-600">support@flipkart.com</span>
            </div>
            <div className="flex items-center mb-2">
              <Phone size={18} className="text-gray-600 mr-2" />
              <span className="text-gray-600">+91 1800 202 9898</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="text-gray-600 mr-2" />
              <span className="text-gray-600">Bangalore, India</span>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-flipkart-blue transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-flipkart-blue transition-colors">Contact Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-flipkart-blue transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-flipkart-blue transition-colors">Press Releases</Link></li>
              <li><Link to="/corporate" className="text-gray-600 hover:text-flipkart-blue transition-colors">Corporate Information</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Help */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/payments" className="text-gray-600 hover:text-flipkart-blue transition-colors">Payments</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-flipkart-blue transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-flipkart-blue transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-flipkart-blue transition-colors">FAQ</Link></li>
              <li><Link to="/report" className="text-gray-600 hover:text-flipkart-blue transition-colors">Report Infringement</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Policy */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Policy</h3>
            <ul className="space-y-2">
              <li><Link to="/return-policy" className="text-gray-600 hover:text-flipkart-blue transition-colors">Return Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-flipkart-blue transition-colors">Terms Of Use</Link></li>
              <li><Link to="/security" className="text-gray-600 hover:text-flipkart-blue transition-colors">Security</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-flipkart-blue transition-colors">Privacy</Link></li>
              <li><Link to="/site-map" className="text-gray-600 hover:text-flipkart-blue transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <CreditCard size={24} className="text-gray-600 mr-2" />
              <span className="text-gray-600">Secure Payments</span>
            </div>
            <div className="flex items-center mb-4 md:mb-0">
              <Shield size={24} className="text-gray-600 mr-2" />
              <span className="text-gray-600">100% Purchase Protection</span>
            </div>
            <div className="flex items-center">
              <HelpCircle size={24} className="text-gray-600 mr-2" />
              <span className="text-gray-600">24/7 Support</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              &copy; {currentYear} Flipkart Clone. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
