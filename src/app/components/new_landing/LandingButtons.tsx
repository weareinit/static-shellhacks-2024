import Link from "next/link";

const LandingButtons = () => {
  return (
    <div className="mt-12 flex flex-col gap-11 text-center">
      <div>
        <Link
          className="bg-reddish_grey w-36 rounded-[1.5rem] px-16 py-4 text-2xl font-extrabold text-stone-50 no-underline"
          href="/apply"
        >
          APPLY
        </Link>
      </div>
      <div>
        <Link
          className="text-reddish_grey w-36 whitespace-nowrap rounded-[1.5rem] bg-stone-50 px-16 py-4 text-2xl font-extrabold no-underline"
          href="/dashboard"
        >
          HACKER DASHBOARD
        </Link>
      </div>
    </div>
  );
};

export default LandingButtons;
