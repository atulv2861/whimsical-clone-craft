
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Navbar } from "@/components/ecommerce/Navbar";
import Footer from "@/components/ecommerce/Footer";

/**
 * A generic/basic page component that can be used for multiple routes
 * This helps prevent "Page Not Found" errors for footer links that
 * don't need fully custom pages yet
 */
const BasicPage = () => {
  const { pageName } = useParams();
  const location = useLocation();
  
  // Extract the page name from the URL path
  const path = location.pathname.substring(1); // Remove leading slash
  const pageTitle = pageName || path;
  
  // Convert path to readable title (e.g., "return-policy" -> "Return Policy")
  const formatTitle = (title: string) => {
    return title
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const displayTitle = formatTitle(pageTitle);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">{displayTitle}</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">{displayTitle} Information</h2>
            <p className="text-gray-700 mb-4">
              This page contains information about {displayTitle.toLowerCase()}.
              We are currently working on adding more detailed content to this page.
            </p>
            <p className="text-gray-700">
              Thank you for your patience as we continue to improve our website.
              If you have any questions or need assistance, please feel free to contact our customer support team.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BasicPage;
