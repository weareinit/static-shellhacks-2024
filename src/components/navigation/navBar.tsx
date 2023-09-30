import React from "react";
import MLHBanner from "../decorations/MLHBanner";

function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuOptions = [
    { id: "about", label: "ABOUT US" },
    { id: "workshops", label: "WORKSHOPS" },
    { id: "faq", label: "FAQS" },
    // { id: "schedule", label: "SCHEDULE" },
    { id: "sponsors", label: "SPONSORS" },
  ];

  return (
    <div className="navbar-container bg-caramel_brown py-4 px-6 md:px-12 hidden md:flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div>
        <MLHBanner />
      </div>
      <div className="pl-5 text-md md:text-xl flex-grow flex justify-center">
        {menuOptions.map((option) => (
          <button key={option.id} className="text-crate_brown font-pixel hover:text-gray-800 mx-4 focus:outline-none" onClick={() => scrollToSection(option.id)}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
