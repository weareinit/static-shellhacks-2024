import Link from "next/link";

const LandingButtons = () => {
  return (
    <div className=" mt-12 flex flex-col items-center gap-5  text-center ">
      <div className="m-0 mx-20 w-56 transform rounded-[1.5rem] bg-reddish_grey pb-2 pt-4 text-center font-zoonaji text-2xl text-stone-50 no-underline transition-all duration-200 ease-in-out hover:scale-105">
        <Link href="/apply">APPLY</Link>
      </div>
      <div className="m-0 w-96 transform rounded-[1.5rem] bg-stone-50 pb-2 pt-4 text-center font-zoonaji text-2xl text-reddish_grey no-underline transition-all duration-200 ease-in-out hover:scale-105">
        <Link href="/dashboard">HACKER DASHBOARD</Link>
      </div>
    </div>
  );
};

export default LandingButtons;
