import React from "react";
import { useState } from "react";
import RegisterModal from "../../registration/RegisterModal";

function NavBar() {
  // const [isChatActive, toggleChatActive] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const content = (
    <div className="flex w-full justify-center">
      <div
        className={`xxl:top-10 xxl:w-[70%] xxl:px-8 xxl:pt-5 xxl:pb-4 fixed top-5 z-[100] flex w-[75%] flex-col justify-center rounded-[40px] border border-gray-700 bg-nav_bar_brown px-4 pt-1 ${
          isActive ? "fixed" : "fixed opacity-0"
        }`}
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
            <button className="delay-80 xxs:text-sm xsm:text-lg xlg:text-base xxl:text-[30px] px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1 sm:text-lg md:text-base lg:text-base">
              About Us
            </button>
            <button className="delay-80 xxs:text-sm xsm:text-lg xlg:text-base xxl:text-[30px] px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1 sm:text-lg md:text-base lg:text-base">
              Events & Workshops
            </button>
            <button className="delay-80 xxs:text-sm xsm:text-lg xlg:text-base xxl:text-[30px] px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1 sm:text-lg md:text-base lg:text-base">
              FAQs
            </button>
            <button className="delay-80 xxs:text-sm xsm:text-lg xlg:text-base xxl:text-[30px] px-4 py-2 font-zoonaji text-xl text-english_walnut transition ease-in-out hover:-translate-y-1 sm:text-lg md:text-base lg:text-base">
              Sponsors
            </button>
          </div>
          <div className="flex justify-between">
            <button className="delay-80 xxs:text-sm xsm:text-lg xlg:text-base xxl:text-[30px] px-4 py-2 font-zoonaji text-xl text-white transition ease-in-out hover:-translate-y-1 md:text-base">
              Hacker Dashboard
            </button>
            <button
              onClick={openModal}
              className="delay-80 xxs:text-sm xsm:text-lg xlg:text-base xxl:text-[30px] px-4 py-2 font-zoonaji text-xl text-darker_cyan underline transition ease-in-out hover:-translate-y-1 md:text-base"
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
