import React, { useState } from "react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Left side: Logo + Project Name */}
          <div className="flex items-center space-x-2">
            {/* Logo (replace with an <img> or <svg> if you have one) */}
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold">L</span>
            </div>
            <span className="font-bold text-lg">AstroProject</span>
          </div>

          {/* Desktop Links (right side) */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#link1" className="hover:text-gray-200 transition-colors">
              Link One
            </a>
            <a href="#link2" className="hover:text-gray-200 transition-colors">
              Link Two
            </a>
            <a href="#link3" className="hover:text-gray-200 transition-colors">
              Link Three
            </a>
          </div>

          {/* Mobile button / hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
                        hover:bg-orange-700"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`h-6 w-6 transform transition-transform 
                  ${isOpen ? "rotate-90" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  // X icon when open
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  // Hamburger icon when closed
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden on desktop) */}
      {isOpen && (
        <div className="md:hidden bg-orange-700" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#link1"
              className="block px-3 py-2 rounded-md hover:bg-orange-800"
            >
              Link One
            </a>
            <a
              href="#link2"
              className="block px-3 py-2 rounded-md hover:bg-orange-800"
            >
              Link Two
            </a>
            <a
              href="#link3"
              className="block px-3 py-2 rounded-md hover:bg-orange-800"
            >
              Link Three
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
