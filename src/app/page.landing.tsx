import { parseCSV } from "@/app/util/parseCSV";
import type { Metadata } from "next";
import Image from "next/image";
import Landing from "./components/new_landing/Landing";
import { getAssetPath } from "./util/getAssetPath";

export const metadata: Metadata = {
  title: "ShellHacks 2024",
  description:
    "Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come together to: Build: Develop innovative projects, Network: Network with top companies, and more! Learn: Learn the latest technologies Develop new skills by attending our technical workshops. Gain experience by building hands-on projects with fellow students. Land your next internship or job by meeting recruiters at our career fair. Win amazing prizes, participate in fun activities, get tons of cool swag, enjoy great food, and much more - all at ShellHacks!",
  icons: {
    icon: getAssetPath("favicon.png"),
  },
  openGraph: {
    type: "website",
    url: "https://shellhacks.net/",
    title: "ShellHacks 2024 ﹣ The Largest Hackathon in Florida!",
    description:
      "Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come together to: Build: Develop innovative projects, Network: Network with top companies, and more! Learn: Learn the latest technologies Develop new skills by attending our technical workshops. Gain experience by building hands-on projects with fellow students. Land your next internship or job by meeting recruiters at our career fair. Win amazing prizes, participate in fun activities, get tons of cool swag, enjoy great food, and much more - all at ShellHacks!",
    images: [
      {
        url: getAssetPath("assets/new/meta.png"),
        alt: "ShellHacks 2024 Meta Image",
      },
    ],
    siteName: "ShellHacks 2024",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://shellhacks.net/",
    title: "ShellHacks 2024 ﹣ The Largest Hackathon in Florida!",
    description:
      "Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come together to: Build: Develop innovative projects, Network: Network with top companies, and more! Learn: Learn the latest technologies Develop new skills by attending our technical workshops. Gain experience by building hands-on projects with fellow students. Land your next internship or job by meeting recruiters at our career fair. Win amazing prizes, participate in fun activities, get tons of cool swag, enjoy great food, and much more - all at ShellHacks!",
    images: [
      {
        url: getAssetPath("assets/new/meta.png"),
        alt: "ShellHacks 2024 Meta Image",
      },
    ],
  },
};

export default function Home() {
  return <Landing />;
}

// Only generate the root page statically
export function generateStaticParams() {
  return [{}];
}
