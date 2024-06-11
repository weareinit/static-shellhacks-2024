import Link from "next/link";
import { useState } from "react";
import RegisterModal from "../registration/RegisterModal";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LandingButtons = () => {
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const showRegister = searchParams.get("show_register");

  const [isModalOpen, setModalOpen] = useState<boolean>(
    showRegister === "true",
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div className=" mt-12 flex flex-col items-center gap-5 text-center ">
      {(!session || !session.user.isRegistered) && (
        <div
          onClick={
            session
              ? openModal
              : () => signIn("discord", { callbackUrl: "/?show_register=true" })
          }
          className="m-0 mx-20 flex w-56 transform cursor-pointer items-center justify-center rounded-[1.5rem] bg-reddish_grey pb-2 pt-4 text-center font-zoonaji text-2xl text-stone-50 no-underline transition-all duration-200 ease-in-out hover:scale-105 xxl:h-[7rem] xxl:w-[25rem] xxl:rounded-[3rem] xxl:text-5xl"
        >
          <p>APPLY</p>
        </div>
      )}
      {isModalOpen && <RegisterModal toClose={closeModal} />}
      <div className="m-0 flex w-96 transform cursor-pointer items-center justify-center rounded-[1.5rem] bg-stone-50 pb-2 pt-4 text-center font-zoonaji text-2xl text-reddish_grey no-underline  transition-all duration-200 ease-in-out hover:scale-105 xxl:h-[7rem] xxl:w-[45rem] xxl:rounded-[3rem] xxl:text-5xl">
        <Link href="/dashboard">HACKER DASHBOARD</Link>
      </div>

      {session && (
        <div
          onClick={() => signOut({ callbackUrl: "/" })}
          className="justify-centertext-center cursor-pointer items-center font-zoonaji text-xl text-red-600 transition-all duration-200 ease-in-out hover:scale-105 xxl:h-[7rem] xxl:w-[25rem] xxl:rounded-[3rem] xxl:text-5xl"
        >
          <p>SIGN OUT</p>
        </div>
      )}
    </div>
  );
};

export default LandingButtons;
