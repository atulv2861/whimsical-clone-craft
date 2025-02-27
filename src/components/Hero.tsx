
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
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 opacity-30 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-50 to-purple-100 opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 right-1/5 w-48 h-48 rounded-full bg-gradient-to-r from-purple-100 to-indigo-200 opacity-20 animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 lg:pr-16 text-center md:text-left mb-12 md:mb-0">
            <FadeIn delay={0.2} duration={0.8}>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-8">
                Introducing Alice Technology
              </span>
            </FadeIn>

            <FadeIn delay={0.4} duration={0.8}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                Construction evolved through technology
              </h1>
            </FadeIn>

            <FadeIn delay={0.6} duration={0.8}>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 text-balance">
                Alice Technologies helps general contractors reduce construction time and cost, minimize risk, and build more.
              </p>
            </FadeIn>

            <FadeIn delay={0.8} duration={0.8}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  variant="primary"
                  onClick={() => window.location.href = "#contact"}
                >
                  Request a Demo
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.location.href = "#solutions"}
                >
                  Learn More
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="md:w-1/2 relative">
            <FadeIn delay={1} duration={0.8}>
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Construction Technology" 
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-800">
                        <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Schedule a personalized demo</p>
                      <p className="text-sm text-gray-600">See how Alice can transform your construction projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={1.2} duration={0.8}>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { text: "500+ Projects Optimized", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" },
              { text: "Time Savings: 13-17%", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" },
              { text: "Cost Reduction: 11%", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" },
              { text: "Productivity Boost: 16%", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center mb-3 overflow-hidden">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <p className="text-sm font-medium text-center">{item.text}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};
