import Link from "next/link";

const LandingButtons = () => {
  return (
    <div className="mt-12 gap-11 flex flex-col text-center">
      <div>
        <Link
          className="w-36 text-2xl font-extrabold rounded-[1.5rem] bg-[#786450] px-16 py-4 text-stone-50 no-underline"
          href="/apply"
        >
          APPLY
        </Link>
      </div>
      <div>
        <Link
          className="w-36 whitespace-nowrap font-extrabold text-2xl rounded-[1.5rem] bg-stone-50 px-16 py-4 text-[#786450] no-underline"
          href="/dashboard"
        >
          HACKER DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default LandingButtons;
