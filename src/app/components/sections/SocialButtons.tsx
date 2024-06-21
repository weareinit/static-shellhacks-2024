import Link from "next/link";
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";
import { SiDiscord } from "react-icons/si";

export default function SocialButtons() {
  return (
    <>
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
