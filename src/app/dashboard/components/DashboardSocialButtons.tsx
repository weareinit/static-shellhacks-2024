import Link from "next/link";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { SiDiscord } from "react-icons/si";

export default function DashboardSocialButtons() {
  return (
    <>
      <div className="col-span-full flex flex-row gap-3">
        <Link href="https://discord.com/invite/init" target="_blank">
          <SiDiscord
            size={40}
            className="fill-dark_brown hover:fill-pink transition ease-in-out hover:scale-125 hover:cursor-pointer"
          />
        </Link>
        <Link href="https://www.instagram.com/initofficial/" target="_blank">
          <AiFillInstagram
            size={40}
            className="fill-dark_brown hover:fill-pink transition ease-in-out hover:scale-125 hover:cursor-pointer"
          />
        </Link>
        <Link href="https://twitter.com/initfiu" target="_blank">
          <AiFillTwitterSquare
            size={40}
            className="fill-dark_brown hover:fill-pink transition ease-in-out hover:scale-125 hover:cursor-pointer"
          />
        </Link>

        <Link href="https://www.facebook.com/init.fiu" target="_blank">
          <AiFillFacebook
            size={40}
            className="fill-dark_brown hover:fill-pink transition ease-in-out hover:scale-125 hover:cursor-pointer"
          />
        </Link>
        <Link
          href="https://www.linkedin.com/company/initofficial/"
          target="_blank"
        >
          <AiFillLinkedin
            size={40}
            className="fill-dark_brown hover:fill-pink transition ease-in-out hover:scale-125 hover:cursor-pointer"
          />
        </Link>
      </div>
    </>
  );
}
