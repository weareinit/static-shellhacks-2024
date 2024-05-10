import Image from "next/image";
import LandingButtons from "./LandingButtons";

const LandingContent = () => {
  return (
    <>
      <div className="text-center">
        <p className="font-[zoonaji] text-[#005871] text-4xl mt-4">
          The Largest Hackathon in the East Coast!
        </p>
        <div className="flex justify-center">
          <p className="font-[museo] text-lg mt-1">Powered by </p>
          <div className="relative top-[0.1625rem] right-3 h-8 w-28">
            <Image
              src="/assets/new/logo/Nvidia_Logo.png"
              alt="Nvidia Logo"
              fill
            />
          </div>
        </div>
        <div className="font-[museo]">
          <div className="font-[museo] text-3xl">September 27th - 29th, 2024</div>
          <div className="font-[museo] text-4xl">FIU&apos;s Grahams Center - Miami, FL</div>
          <div>INSERT SOCIAL MEDIA ICONS</div>
        </div>
      </div>
      <LandingButtons />
      {
        // i think the scroll for more gif is ugly. there is a way to do it with json lottie animations:
        // https://app.lottiefiles.com/animation/49b666a1-2cde-4881-971c-376b26b09ce9?channel=web&source=public-animation&panel=download
      }
      <div className="mt-7 flex justify-center">
        <div className="relative bottom-3 h-11 w-11">
          <Image
            src="/assets/new/animation/scroll_for_more.gif"
            alt="scroll for more"
            fill
          />
        </div>
        <p>scroll for more!</p>
      </div>
    </>
  );
};

export default LandingContent;
