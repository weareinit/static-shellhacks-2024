import React from "react";
import { useState } from "react";
import RegisterModal from "../../registration/RegisterModal";
import Image from "next/image";

function NavBar() {
  const [isActive, setActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const content = (
    <div className="w-full justify-center xxs:hidden sm:flex">
      <div className="fixed right-2 top-2 z-[100] hover:cursor-pointer">
        <button
          onClick={() => {
            setActive((isActive) => !isActive);
          }}
        >
          <Image
            src="assets/new/logo/Menu Icon.svg"
            height={40}
            width={40}
            alt="navbar"
          ></Image>
        </button>
      </div>
      <div
        className={`fixed top-5 z-[100] flex w-[75%] flex-col justify-center rounded-[40px] 
          border 
          border-gray-700 bg-nav_bar_brown px-4 pt-1 sm:mt-3 sm:w-[97%] sm:pb-0 sm:pt-1 md:w-[85%] lg:top-7 
          lg:w-[82%] lg:px-5 lg:pb-2 lg:pt-3 xlg:top-8 xlg:w-[78%] xlg:px-6 xlg:pb-2 xlg:pt-3 xxl:top-10 xxl:w-[70%] 
          xxl:px-8 xxl:pb-4 xxl:pt-5 ${isActive ? "fixed" : "fixed opacity-0"}`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => {
          setActive(false);
        }}
        style={{
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        <div className="flex justify-between">
          <div className="justify-left flex items-center">
            <button
              className="delay-80 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out 
            hover:-translate-y-1 sm:text-[15px] md:text-base lg:text-[20px] xlg:text-[25px] xxl:text-[30px]"
            >
              About Us
            </button>
            <button
              className="delay-80 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1 
              sm:text-[15px] md:text-base lg:text-[20px] xlg:text-[25px] xxl:text-[30px]"
            >
              Events & Workshops
            </button>
            <button
              className="delay-80 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1 
              sm:text-[15px] md:text-base lg:text-[20px] xlg:text-[25px] xxl:text-[30px]"
            >
              FAQs
            </button>
            <button
              className="delay-80 px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1  
              sm:text-[15px] md:text-base lg:text-[20px] xlg:text-[25px] xxl:text-[30px]"
            >
              Sponsors
            </button>
          </div>
          <div className="flex justify-between">
            <button
              className="delay-80 px-4 py-2 font-zoonaji text-xl text-white transition ease-in-out hover:-translate-y-1 xxs:text-sm 
            xsm:text-lg sm:text-[15px] md:text-base lg:text-[20px] xlg:text-[25px] xxl:text-[30px]"
            >
              Hacker Dashboard
            </button>
            <button
              onClick={openModal}
              className="delay-80 px-4 py-2 font-zoonaji text-xl text-darker_cyan underline transition ease-in-out hover:-translate-y-1 
              xxs:text-sm xsm:text-lg sm:text-[15px] md:text-base lg:text-[20px] xlg:text-[25px] xxl:text-[30px]"
            >
              Apply!
            </button>
            {isModalOpen && <RegisterModal toClose={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}

export default NavBar;
