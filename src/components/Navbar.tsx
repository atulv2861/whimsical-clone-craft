
import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";

const navLinks = [
  { title: "Solutions", href: "#solutions" },
  { title: "Products", href: "#products" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    // For demonstration, we'll just show an alert
    alert("Sign in functionality would be implemented here");
    setShowSignInModal(true);
  };

  const handleSignUp = (e: React.MouseEvent) => {
    e.preventDefault();
    // For demonstration, we'll just show an alert
    alert("Sign up functionality would be implemented here");
    setShowSignUpModal(true);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're on the home page but section doesn't exist yet
      if (window.location.pathname === '/') {
        // Just close the menu, we're already on the homepage
        return;
      }
      // If we're not on the home page, navigate to it
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">alice</span>
              <span className="text-2xl text-purple-400">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors link-underline"
              >
                {link.title}
              </a>
            ))}
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignIn}
              className="flex items-center space-x-1"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleSignUp}
              className="flex items-center space-x-1 bg-purple-700 hover:bg-purple-800"
            >
              <UserPlus className="h-4 w-4" />
              <span>Get Started</span>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-8">
              <Link
                to="/"
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-2xl font-bold">alice</span>
                <span className="text-2xl text-purple-400">.</span>
              </Link>
              <button
                className="text-gray-700 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-lg font-medium text-gray-700 hover:text-black transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.substring(1));
                  }}
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="mt-auto flex flex-col space-y-4 pt-8">
              <Button 
                variant="outline" 
                onClick={handleSignIn}
                className="flex items-center justify-center space-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Button>
              <Button
                variant="primary"
                onClick={handleSignUp}
                className="flex items-center justify-center space-x-2 bg-purple-700 hover:bg-purple-800"
              >
                <UserPlus className="h-5 w-5" />
                <span>Get Started</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
