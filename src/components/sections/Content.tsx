import React, { useEffect } from "react";

import { useShowRegistrationContext } from "@/hooks/ShowRegistrationContext";
import RegisterModal from "../registration/RegisterModal";
import MLHBanner from "../decorations/MLHBanner";
import Welcome from "./Welcome";
import AboutUs from "./AboutUs";
import BlurBackdrop from "../decorations/BlurBackdrop";
import FAQ from "./FAQ";

function Content() {
  const { showRegistration, setShowRegistration, finishedRegistration } = useShowRegistrationContext();

  useEffect(() => {
    if (showRegistration) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showRegistration]);

  let modal = <div className="fixed top-0 left-0 backdrop-blur-sm w-screen h-screen"></div>;

  return (
    // TODO: Implement sky section design, with About Us, Welcome, FAQ
    <main className="flex flex-col min-h-screen items-center md:col-span-8 md:col-start-3 row-start-1 col-span-1 z-10">
      <MLHBanner />
      <Welcome />
      <AboutUs />
      <FAQ />
      {showRegistration && (
        <RegisterModal
          toClose={(event) => {
            event.preventDefault();
            setShowRegistration(false);
          }}
        />
      )}
      <BlurBackdrop />
    </main>
  );
}

export default Content;
