
import React from "react";
import { FadeIn } from "./FadeIn";
import { Button } from "./Button";

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
};

const features: FeatureItem[] = [
  {
    title: "Advanced Simulation",
    description:
      "Our AI technology simulates thousands of construction sequence options to find optimal project plans.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
  },
  {
    title: "Rapid Replanning",
    description:
      "Adapt to changes in real-time. Our software quickly generates new plans when project conditions change.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9M3 15V19C3 20.1046 3.89543 21 5 21H9M15 21H19C20.1046 21 21 20.1046 21 19V15M21 9V5C21 3.89543 20.1046 3 19 3H15M12 12L12 12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
  },
  {
    title: "Impact Analysis",
    description:
      "Understand how changes affect your project schedules and costs before they happen.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H15M12 21L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
];

export const Features: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
              Our Solutions
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold">
              AI-Powered Construction Planning & Scheduling
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Alice Technologies helps general contractors build more efficiently and adapt to change faster than ever before.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 gap-12 mb-16">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1} threshold={0.2}>
              <div className={`bg-white rounded-lg shadow-md overflow-hidden ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} md:flex`}>
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <img 
                    src={feature.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"} 
                    alt={feature.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-transparent"></div>
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-800 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center text-sm font-medium text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    Learn more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1"
                    >
                      <path
                        d="M6.66675 12.6667L11.3334 8.00004L6.66675 3.33337"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-lg fancy-blur-bg" id="contact">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 md:pr-12">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  Ready to revolutionize your construction projects?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join the hundreds of leading contractors already using Alice to transform their operations. Schedule a personalized demo to see our solutions in action.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    className="bg-purple-700 hover:bg-purple-800"
                    onClick={() => {
                      alert("Demo request submitted! Our team will contact you shortly.");
                    }}
                  >
                    Schedule a Demo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.href = "#solutions";
                    }}
                  >
                    View Case Studies
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-8 md:mt-0">
                <div className="aspect-square bg-purple-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                    alt="Construction Planning" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
