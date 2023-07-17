import React, { useState } from "react";
import MLHBanner from "../decorations/MLHBanner";

function Navbar() {
  
    const scrollToSection = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    };
        return (
          <div className="navbar-container hidden md:block">
            <nav className="bg-navbar_background py-4 px-6 md:px-12 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
              <div>
                <MLHBanner />
              </div>
              <div className="font-pixel text-2xl flex-grow text-center">
                <button
                  className="block mt-4 md:inline-block md:mt-0 text-crate_brown hover:text-gray-800 mx-4"
                  onClick={() => scrollToSection("welcome")}
                >
                  REGISTER
                </button>
                <button
                  className="block mt-4 md:inline-block md:mt-0 text-crate_brown hover:text-gray-800 mx-4"
                  onClick={() => scrollToSection("about")}
                >
                  ABOUT US
                </button>
                <button
                  className="block mt-4 md:inline-block md:mt-0 text-crate_brown hover:text-gray-800 mx-4"
                  onClick={() => scrollToSection("faq")}
                >
                  FAQs
                </button>
              </div>
            </nav>
          </div>
        );
    }
      
export default Navbar;
      
  
  
  
  
  