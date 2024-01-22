"use client";
import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ShowHackerGuideProvider } from "@/hooks/ShowHackerGuideContext";

const queryClient = new QueryClient();

// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <title>ShellHacks</title>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ShowHackerGuideProvider>
            <body>{children}</body>
            <div id="hacker-guide-container" />
          </ShowHackerGuideProvider>
        </UserProvider>
      </QueryClientProvider>
    </html>
  );
}
