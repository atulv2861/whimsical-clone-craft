
import React from "react";
import { FadeIn } from "./FadeIn";

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: FeatureItem[] = [
  {
    title: "Advanced Robotics",
    description:
      "Our cutting-edge robotics system automates repetitive construction tasks with precision and efficiency.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "AI-Powered Planning",
    description:
      "Our AI algorithms optimize construction planning, reducing costs and improving project timelines.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9M3 15V19C3 20.1046 3.89543 21 5 21H9M15 21H19C20.1046 21 21 20.1046 21 19V15M21 9V5C21 3.89543 20.1046 3 19 3H15M12 12L12 12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Real-Time Monitoring",
    description:
      "Monitor your construction site in real-time with our advanced sensors and analytics dashboard.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H15M12 21L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Enhanced Safety",
    description:
      "Our technology helps predict and prevent potential hazards, keeping your construction site safe.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 15V17M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Smart Materials",
    description:
      "Utilize our smart materials that adapt to environmental conditions and provide better durability.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Resource Optimization",
    description:
      "Our system efficiently allocates resources, minimizing waste and maximizing productivity.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 10V14M16 7V17M19 4V20M10 17H5C3.89543 17 3 16.1046 3 15V9C3 7.89543 3.89543 7 5 7H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export const Features: React.FC = () => {
  return (
    <section id="solutions" className="py-24 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm font-medium mb-6">
              Our Solutions
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold">
              Revolutionary Technology for Modern Construction
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We've developed a suite of advanced technologies that address the biggest challenges in today's construction industry.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.2 + index * 0.1} threshold={0.2}>
              <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
                <a
                  href="#"
                  className="mt-6 inline-flex items-center text-sm font-medium text-black link-underline"
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
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-md fancy-blur-bg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 md:pr-12">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  Experience the future of construction today
                </h3>
                <p className="text-gray-600 mb-6">
                  Join the hundreds of construction companies already using our technology to transform their operations. Schedule a personalized demo to see our solutions in action.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-black text-white h-10 px-4 text-sm font-medium transition-colors hover:opacity-90"
                  >
                    Schedule a Demo
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-md border border-black bg-transparent h-10 px-4 text-sm font-medium transition-colors hover:bg-gray-50"
                  >
                    View Case Studies
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/3 mt-8 md:mt-0">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
