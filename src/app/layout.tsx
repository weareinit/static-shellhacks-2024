import QueryClientComponent from "@/app/state/queryclient";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
