
import React, { useEffect, useRef } from "react";
import { FadeIn } from "./FadeIn";
import { Button } from "./Button";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current || !floatingElementsRef.current) return;
      
      const scrollPosition = window.scrollY;
      const speed = 0.2;
      
      floatingElementsRef.current.style.transform = `translateY(${scrollPosition * speed}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 lg:pb-32 min-h-screen flex items-center"
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(248, 250, 252, 0.4) 0%, transparent 70%)"
        }}
      ></div>
      
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Animated background shapes */}
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 opacity-30 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 right-1/5 w-48 h-48 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 opacity-20 animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0.2} duration={0.8}>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium mb-8">
              Introducing Alice Technology
            </span>
          </FadeIn>

          <FadeIn delay={0.4} duration={0.8}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance max-w-3xl mx-auto leading-tight">
              Revolutionizing Construction Through Advanced Technology
            </h1>
          </FadeIn>

          <FadeIn delay={0.6} duration={0.8}>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto text-balance">
              We're transforming the construction industry with cutting-edge robotics, AI, and smart tools designed to increase efficiency and safety.
            </p>
          </FadeIn>

          <FadeIn delay={0.8} duration={0.8}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary">
                Request a Demo
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={1} duration={0.8}>
            <div className="mt-20 w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl glass-panel">
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Interactive Demo Video</p>
                    <p className="text-sm opacity-80 mt-2">Click to watch our technology in action</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={1.2} duration={0.8}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                "Trusted by 500+ companies",
                "Industry leading technology",
                "24/7 support and service",
                "Award-winning solutions"
              ].map((text, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <span className="text-gray-500 text-xl font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">{text}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
