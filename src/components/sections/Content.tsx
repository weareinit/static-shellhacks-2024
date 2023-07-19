import React, { useEffect, useState } from "react";
import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import RegisterModal from "../registration/RegisterModal";
import MLHBanner from "../decorations/MLHBanner";
import Welcome from "./Welcome";
import AboutUs from "./AboutUs";
import BlurBackdrop from "../decorations/BlurBackdrop";
import FAQ from "./FAQ";
import Navbar from "../navigation/navBar";
import MobileNav from "../navigation/mobileNav";
import Schedule from "./Schedule";
import Sponsors from "./Sponsors";
import Workshops from "./Workshops";
import Showcase from "./Showcase";
import CommunityPartners from "./CommunityPartners";

function Content() {
  const { showRegistration, setShowRegistration, finishedRegistration } = useShowRegistrationContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (showRegistration && typeof document !== "undefined") {
      document.body.classList.add("overflow-hidden");
    } else if (typeof document !== "undefined") {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showRegistration]);

  return (
    <main className="flex flex-col min-h-screen items-center md:col-span-8 md:col-start-3 row-start-1 col-span-1 z-10">
      <div className="pb-4">{isMobile ? <MobileNav /> : <Navbar />}</div>
      <div id="welcome" className="pl-4 md:pl-10">
        <Welcome />
      </div>

      <div id="about">
        <AboutUs />
      </div>
      <div id="workshops">
        <Workshops />
      </div>
      <div id="faq" className="w-full">
        <FAQ />
      </div>
      {/* <Showcase src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" heading="Powered By">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Showcase> */}
      <section id="schedule">
        <Schedule />
      </section>
      <section id="sponsors">
        <Sponsors />
      </section>
      <CommunityPartners />
      {showRegistration && (
        <RegisterModal
          toClose={(event) => {
            event.preventDefault();
            setShowRegistration(false);
          }}
        />
      )}
      {/* <BlurBackdrop /> */}
    </main>
  );
}

export default Content;
