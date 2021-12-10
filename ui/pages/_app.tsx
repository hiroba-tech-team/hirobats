import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 最初のページ描写時にmaterialize-cssを読み込む
    const M = require("materialize-css");
    M.AutoInit();
  }, []);
  return (
    <>
      <React.Fragment>
        <Head>
          <title key="title">hirobats</title>
          {/* Import Google Icon Font */}
          <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
          {/* Import materialize.css */}
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
            rel="stylesheet"
          ></link>
        </Head>

        {/* Import materialize.js */}
        <script src="js/materialize.min.js"></script>
        {/* And then your bundled js */}
        <script src="path/to/your/bundle.js"></script>
      </React.Fragment>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
