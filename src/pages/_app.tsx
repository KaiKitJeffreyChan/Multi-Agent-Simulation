import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#181818" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#181818" />
        <title>Multi-Agent Simulation</title>
        <meta name="description" content="Multi-Agent Simulation" />
        <meta
          name="keywords"
          content="multi-agent, simulation, AI, technology, agents, LLM, large language model"
        />
        <meta name="author" content="Kai Kit Jeffrey Chan" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Multi-Agent Simulation" />
        <meta property="og:description" content="Multi-Agent Simulation" />
        <link
          rel="icon"
          href="/favicon.png"
          type="image/<generated>"
          sizes="<generated>"
        />
        {/* <meta property="og:image" content="/images/robot_img.png" /> */}
        <meta property="og:url" content="www.multiagentsim.co" />

        {/* <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Multi-Agent Simulation" />
        <meta name="twitter:description" content="Multi-Agent Simulation" />
        <meta name="twitter:image" content="/path/to/your/image.jpg" />
        <meta name="twitter:site" content="@yourtwitterhandle" /> */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;
