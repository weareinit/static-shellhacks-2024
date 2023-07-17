import React, { useEffect } from "react";

import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import RegisterModal from "../registration/RegisterModal";
import MLHBanner from "../decorations/MLHBanner";
import Welcome from "./Welcome";
import AboutUs from "./AboutUs";
import BlurBackdrop from "../decorations/BlurBackdrop";
import FAQ from "./FAQ";
import Navbar from "../navigation/navBar";
import Schedule from "./Schedule";
import Sponsors from "./Sponsors";
import Workshops from "./Workshops";
import Showcase from "./Showcase";

function Content() {
  const { showRegistration, setShowRegistration, finishedRegistration } = useShowRegistrationContext();

  useEffect(() => {
    if (showRegistration) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showRegistration]);

  let modal = <div className="fixed top-0 left-0 w-screen h-screen"></div>;

  return (
    // TODO: Implement sky section design, with About Us, Welcome, FAQ
    <main className="flex flex-col min-h-screen items-center md:col-span-8 md:col-start-3 row-start-1 col-span-1 z-10">
      <Navbar />
      <MLHBanner />
      <Welcome />
      <AboutUs />
      <Workshops />
      <FAQ />
      {/* <Showcase src="/assets/sponsors/microsoft.svg" alt="Microsoft Logo" heading="Powered By">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Showcase> */}
      <Schedule />
      <Sponsors />
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
