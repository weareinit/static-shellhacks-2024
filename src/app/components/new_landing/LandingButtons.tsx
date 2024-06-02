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
        className="xxl:text-5xl xxl:w-[25rem] xxl:h-[7rem] xxl:rounded-[3rem] m-0 mx-20 flex w-56 transform cursor-pointer items-center justify-center rounded-[1.5rem] bg-reddish_grey pb-2 pt-4 text-center font-zoonaji text-2xl text-stone-50 no-underline transition-all duration-200 ease-in-out hover:scale-105"
      >
        <p>APPLY</p>
      </div>
      {isModalOpen && <RegisterModal toClose={closeModal} />}
      <div className="xxl:text-5xl xxl:w-[45rem] xxl:h-[7rem] xxl:rounded-[3rem] m-0 flex w-96 transform cursor-pointer items-center justify-center rounded-[1.5rem] bg-stone-50 pb-2 pt-4 text-center  font-zoonaji text-2xl text-reddish_grey no-underline transition-all duration-200 ease-in-out hover:scale-105">
        <Link href="/dashboard">HACKER DASHBOARD</Link>
      </div>
    </div>
  );
};

export default LandingButtons;
