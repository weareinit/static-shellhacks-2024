import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function SideBar() {
  const [isActive, setActive] = useState(false);
  const handleOverlayClick = (e: any) => {
    if (e.target.id === "sidebar-overlay") {
      setActive(false);
    }
  };

  // Disable scrolling when sidebar is active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isActive]);

  return (
    <div className="xxs:flex xsm:flex sm:hidden">
      <div className="fixed right-2 top-2 z-[100] hover:cursor-pointer">
        <button
          onClick={() => {
            setActive(!isActive);
          }}
        >
          <Image
            src="assets/new/logo/Menu Icon.svg"
            height={40}
            width={40}
            alt="sidebar"
          />
        </button>
      </div>
      {isActive && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 z-[90] bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        ></div>
      )}
      <div
        className={`fixed left-0 top-0 z-[100] h-full w-[75%] max-w-xs bg-nav_bar_brown p-4 transition-transform duration-300 ease-in-out ${isActive ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col items-start">
          <a href="#about-us" onClick={() => setActive(!isActive)}>
            <button className="mb-4 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1">
              About Us
            </button>
          </a>
          <a href="#faqs" onClick={() => setActive(!isActive)}>
            <button className="mb-4 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1">
              FAQs
            </button>
          </a>
          <a href="#organizers" onClick={() => setActive(!isActive)}>
            <button className="mb-4 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1">
              Organizers
            </button>
          </a>
          <a href="#sponsors" onClick={() => setActive(!isActive)}>
            <button className="mb-4 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1">
              Sponsors
            </button>
          </a>

          <Link href="/dashboard" onClick={() => setActive(!isActive)}>
            <button className="mb-4 px-4 py-2 font-zoonaji text-xl text-white transition ease-in-out hover:-translate-y-1">
              Hacker Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
