// pages/index.js

import App, { AppContext, AppInitialProps, AppProps } from 'next/app'
import '../styles/global.css';
 
type AppOwnProps = { example: string }
 
export default function MyApp({
  Component,
  pageProps,
  example,
}: AppProps & AppOwnProps) {
  return (
//    <div className="bg-sky-200 dark:bg-sky-600 md:container md:mx-auto">
    <div className="md:container md:mx-auto">
      <div><p>Data: {example}</p></div>
      <br/>
      <Component {...pageProps} />
    </div>
  )
}
 
MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context)
  return { ...ctx, example: 'data' }
}
