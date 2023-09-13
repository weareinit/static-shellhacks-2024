import Link from "next/link";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";
import { SiDiscord } from "react-icons/si";

export default function SocialButtons() {
  return (
    <>
      <div className="flex items-center justify-center w-full col-span-full">
        <h3 className="w-[40vw] max-w-[500px] min-w-[300px] py-2 justify-center text-center text-crate_brown">
          Catch ShellHacks live! Streaming now at:{" "}
          <a href="https://on.mediastre.am/events/mediastream--eventos-us/shell-hacks-2023/live" className=" break-normal w-fit">
            https://on.mediastre.am/
          </a>
        </h3>
      </div>
      <div className="flex flex-row justify-center gap-3 col-span-full">
        <Link href="https://discord.com/invite/init" target="_blank">
          <SiDiscord size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
        </Link>
        <Link href="https://www.instagram.com/initofficial/" target="_blank">
          <AiFillInstagram size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
        </Link>
        <Link href="https://twitter.com/initfiu" target="_blank">
          <AiFillTwitterSquare size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
        </Link>

        <Link href="https://www.facebook.com/init.fiu" target="_blank">
          <AiFillFacebook size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
        </Link>
        <Link href="https://www.linkedin.com/company/initofficial/" target="_blank">
          <AiFillLinkedin size={40} className="hover:fill-pink hover:cursor-pointer fill-dark_brown hover:scale-125 transition ease-in-out" />
        </Link>
      </div>
    </>
  );
}
