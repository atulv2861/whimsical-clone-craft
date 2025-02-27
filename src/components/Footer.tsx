
import React from "react";

const footerLinks = [
  {
    title: "Products",
    links: [
      { name: "Construction Optioneering", href: "#" },
      { name: "AI Planning", href: "#" },
      { name: "Schedule Analysis", href: "#" },
      { name: "Risk Management", href: "#" },
      { name: "Smart Resources", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "News", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Partners", href: "#" },
      { name: "Support", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "Licenses", href: "#" },
      { name: "Settings", href: "#" },
    ],
  },
];

export const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If the section doesn't exist on this page, we can navigate to it
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200" id="about">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-10 md:mb-0 md:w-1/3">
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">alice</span>
                <span className="text-2xl text-purple-400">.</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                ALICE Technologies helps general contractors and owners worldwide reduce project costs and timelines through AI-powered construction simulation and optimization.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/alicetech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 4.01C21 4.5 20.02 4.84 19 5.01C18.39 4.33 17.39 3.95 16.35 3.95C14.31 3.95 12.68 5.61 12.68 7.63C12.68 7.94 12.71 8.24 12.78 8.53C9.65 8.38 6.89 6.93 5.05 4.68C4.72 5.26 4.53 5.94 4.53 6.67C4.53 8.02 5.15 9.21 6.13 9.92C5.59 9.89 5.08 9.74 4.63 9.49C4.63 9.51 4.63 9.52 4.63 9.54C4.63 11.31 5.88 12.8 7.53 13.18C7.15 13.28 6.75 13.31 6.35 13.31C6.07 13.31 5.81 13.29 5.54 13.23C6.09 14.69 7.46 15.69 9.07 15.72C7.78 16.67 6.18 17.21 4.46 17.21C4.16 17.21 3.86 17.19 3.56 17.16C5.17 18.16 7.09 18.73 9.12 18.73C16.34 18.73 20.3 12.81 20.3 7.78C20.3 7.6 20.3 7.42 20.28 7.25C21.29 6.59 22.14 5.73 22.8 4.73C21.92 5.07 20.96 5.28 19.95 5.38C21.01 4.8 21.8 3.85 22.16 2.72C21.2 3.28 20.14 3.68 19.01 3.9C17.23 2.02 14.56 1.72 12.38 3.17C10.74 4.26 9.89 6.19 10.26 8.11C7.16 7.95 4.29 6.49 2.33 4C1.38 5.71 1.81 7.91 3.42 9.13C2.79 9.1 2.17 8.93 1.62 8.61C1.62 8.63 1.62 8.65 1.62 8.66C1.62 10.61 2.9 12.21 4.65 12.61C4.06 12.78 3.43 12.8 2.82 12.67C3.37 14.32 4.86 15.38 6.58 15.42C5.17 16.47 3.44 17.04 1.66 17.04C1.39 17.04 1.12 17.03 0.85 17C2.65 18.12 4.75 18.71 6.91 18.71"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/alicetech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
                      fill="currentColor"
                    />
                    <path d="M6 9H2V21H6V9Z" fill="currentColor" />
                    <path
                      d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/c/alicetech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                  aria-label="YouTube"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((column, idx) => (
                <div key={idx}>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            if (link.href.startsWith('#')) {
                              e.preventDefault();
                              scrollToSection(link.href.substring(1));
                            }
                          }}
                          className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Alice Technology. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-500 hover:text-purple-700 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-purple-700 transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
