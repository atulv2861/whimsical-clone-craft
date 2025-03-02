
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

  // Mock content based on page type
  const getPageContent = () => {
    switch(path) {
      case 'payments':
        return "We accept various payment methods including Credit/Debit Cards, UPI, Net Banking, EMI, and Cash on Delivery. All transactions are secure and encrypted.";
      case 'shipping':
        return "We offer fast and reliable shipping across India. Standard delivery typically takes 2-4 business days, while express delivery is available for select pincode areas.";
      case 'returns':
        return "Easy returns within 30 days of purchase. Initiate a return from your order history, and our team will assist you with the return process.";
      case 'faq':
        return "Find answers to commonly asked questions about orders, delivery, returns, payments, and more. If you can't find what you're looking for, please contact our customer support.";
      case 'return-policy':
        return "Our hassle-free 30-day return policy allows you to return any item in its original condition. Refunds are typically processed within 5-7 business days after we receive the returned item.";
      case 'terms':
        return "By using our website, you agree to our terms and conditions. These include guidelines for using our services, intellectual property rights, liability limitations, and dispute resolution procedures.";
      case 'security':
        return "We employ industry-standard security measures to protect your data. All transactions are encrypted, and we never store your full payment details on our servers.";
      case 'privacy':
        return "Your privacy is important to us. We collect only essential information needed to process your orders and improve your shopping experience. We never sell your personal data to third parties.";
      case 'careers':
        return "Join our growing team of talented individuals. We offer competitive compensation, a positive work culture, and opportunities for professional growth.";
      case 'press':
        return "Find the latest news, press releases, and media resources about our company. For press inquiries, please contact our media relations team.";
      case 'corporate':
        return "Learn about our company's mission, vision, and values. Our corporate responsibility initiatives focus on sustainability, community engagement, and ethical business practices.";
      case 'report':
        return "Report issues with products, service, or website functionality. Your feedback helps us improve our services for all customers.";
      case 'site-map':
        return "Navigate through all sections of our website with our comprehensive site map. Find categories, product pages, and information resources easily.";
      default:
        return "This page contains information about " + displayTitle.toLowerCase() + ". We are currently working on adding more detailed content to this page.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">{displayTitle}</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">{displayTitle} Information</h2>
            <p className="text-gray-700 mb-4">
              {getPageContent()}
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
