import React, { useState } from "react";
import MLHBanner from "../decorations/MLHBanner";

function MobileNav() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prevState) => !prevState);
  };

  const menuOptions = [
    { id: "welcome", label: "REGISTER" },
    { id: "about", label: "ABOUT US" },
    { id: "workshops", label: "WORKSHOPS" },
    { id: "faq", label: "FAQS" },
    // { id: "schedule", label: "SCHEDULE" },
    { id: "sponsors", label: "SPONSORS" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      toggleMenu();
    }
  };

  return (
    <div className="navbar-container font-pixel bg-caramel_brown py-4 px-6 md:hidden flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="text-center">
        {!menuVisible && <MLHBanner />}
      </div>
      <div>
        <button
          className="text-crate_brown font-console hover:text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {menuVisible && (
          <div className="absolute right-0 top-full -mt-1 py-2 w-full bg-caramel_brown rounded-md shadow-lg">
            <div className="flex flex-col items-center">
              {menuOptions.map((option) => (
                <button
                  key={option.id}
                  className="block px-4 py-2 text-xl text-crate_brown hover:text-gray-800 focus:outline-none"
                  onClick={() => scrollToSection(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileNav;
