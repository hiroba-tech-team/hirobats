import React, {useEffect} from "react"
import type { AppProps } from 'next/app'
import "materialize-css/dist/css/materialize.min.css";


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 最初のページ描写時にmaterialize-cssを読み込む
    const M = require("materialize-css");
    M.AutoInit();
  }, []);
  return <Component {...pageProps} />
}

export default MyApp
