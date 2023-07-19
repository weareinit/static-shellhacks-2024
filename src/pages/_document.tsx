import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          property="description"
          content="Join us for ShellHacks, Florida's Largest Hackathon! 1,000+ students from around the world will come together to learn the latest technologies, develop innovative solutions, network with top companies, and more!"
        />
        <meta property="og:title" content="Shellhacks"></meta>
        <meta property="og:description" content="Join us for ShellHacks, Florida's Largest Hackathon!" />
        <meta property="og:url" content="https://shellhacks.net" />
        <meta property="og:image" content="https://d112y698adiu2z.cloudfront.net/photos/production/challenge_thumbnails/002/214/234/datas/original.png"></meta>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
