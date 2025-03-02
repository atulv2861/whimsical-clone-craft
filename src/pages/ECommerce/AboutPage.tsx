
import React from "react";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">About Us</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2007, Flipkart is India's leading e-commerce marketplace offering over 80 million products across 80+ categories. 
              With a vision to transform the way India buys and sells, we've revolutionized online shopping with innovations like Cash on Delivery, 
              No Cost EMI, easy returns, and much more.
            </p>
            <p className="text-gray-700 mb-4">
              What began as a small online bookstore has transformed into India's largest online marketplace. Our journey has been 
              marked by milestones that have shaped e-commerce in India.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              To provide a reliable and frictionless commerce ecosystem that creates life-changing experiences for buyers and sellers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Customer Obsession</li>
              <li>Integrity</li>
              <li>Bias for Action</li>
              <li>Innovation</li>
              <li>Ownership</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
