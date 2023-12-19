// pages/index.js

import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Link from "next/link";
import "../styles/global.css";

type AppOwnProps = { example: string };

export default function MyApp({
  Component,
  pageProps,
  example,
}: AppProps & AppOwnProps) {
  return (
    <div className="md:container md:mx-auto bg-sky-700 text-sky-50 font-serif">
      <div>
        <p>Data: {example}</p>
      </div>
      <br />
      <Component {...pageProps} />
    </div>
  );
}

/*
MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
  return { ...ctx, example: 'data' }
} 
*/
