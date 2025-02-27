
import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Set up reveal animation for elements with reveal-item class
    const revealItems = document.querySelectorAll(".reveal-item");
    
    const revealOnScroll = () => {
      revealItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 60) {
          item.classList.add("is-revealed");
        }
      });
    };

    // Run once on load
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", revealOnScroll);
    
    // Clean up
    return () => {
      window.removeEventListener("scroll", revealOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        {/* Add more sections as needed */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
