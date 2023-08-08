import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ShowHackerGuideProvider } from "@/hooks/ShowHackerGuideContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>ShellHacks</title>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ShowHackerGuideProvider>
            <Component {...pageProps} />
            <div id="hacker-guide-container" />
          </ShowHackerGuideProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}
