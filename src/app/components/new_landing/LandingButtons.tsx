import Link from "next/link";
import { useState } from "react";
import RegisterModal from "../registration/RegisterModal";

const LandingButtons = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className=" mt-12 flex flex-col items-center gap-5 text-center ">
      <div
        onClick={openModal}
        className="bg-reddish_grey font-zoonaji m-0 mx-20 w-56 transform cursor-pointer rounded-[1.5rem] pb-2 pt-4 text-center text-2xl text-stone-50 no-underline transition-all duration-200 ease-in-out hover:scale-105"
      >
        <p>APPLY</p>
      </div>
      {isModalOpen && <RegisterModal toClose={closeModal} />}
      <div className="font-zoonaji text-reddish_grey m-0 w-96 transform cursor-pointer rounded-[1.5rem] bg-stone-50 pb-2 pt-4 text-center text-2xl no-underline transition-all duration-200 ease-in-out hover:scale-105">
        <Link href="/dashboard">HACKER DASHBOARD</Link>
      </div>
    </div>
  );
};

export default LandingButtons;
