import QueryClientComponent from "@/app/state/queryclient";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "ShellHacks 2024 ﹣ The Largest Hackathon in Florida!",
  description:
    "Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come together to: Build: Develop innovative projects, Network: Network with top companies, and more! Learn: Learn the latest technologies Develop new skills by attending our technical workshops. Gain experience by building hands-on projects with fellow students. Land your next internship or job by meeting recruiters at our career fair. Win amazing prizes, participate in fun activities, get tons of cool swag, enjoy great food, and much more - all at ShellHacks!",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "https://dev.shellhacks.net/",
    title: "ShellHacks 2024 ﹣ The Largest Hackathon in Florida!",
    description:
      "Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come together to: Build: Develop innovative projects, Network: Network with top companies, and more! Learn: Learn the latest technologies Develop new skills by attending our technical workshops. Gain experience by building hands-on projects with fellow students. Land your next internship or job by meeting recruiters at our career fair. Win amazing prizes, participate in fun activities, get tons of cool swag, enjoy great food, and much more - all at ShellHacks!",
    images: [
      {
        url: "/assets/new/meta.png",
        alt: "ShellHacks 2024 Meta Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    url: "https://dev.shellhacks.net/",
    title: "ShellHacks 2024 ﹣ The Largest Hackathon in Florida!",
    description:
      "Ready to immerse yourself in the ultimate tech experience? Join us for ShellHacks, Florida's Largest Hackathon! Over 1,000 students from across the state and around the world will come together to: Build: Develop innovative projects, Network: Network with top companies, and more! Learn: Learn the latest technologies Develop new skills by attending our technical workshops. Gain experience by building hands-on projects with fellow students. Land your next internship or job by meeting recruiters at our career fair. Win amazing prizes, participate in fun activities, get tons of cool swag, enjoy great food, and much more - all at ShellHacks!",
    images: [
      {
        url: "/assets/new/meta.png",
        alt: "ShellHacks 2024 Meta Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientComponent>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>{children}</body>
      </html>
    </QueryClientComponent>
  );
}
