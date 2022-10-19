import { AppProps } from "next/app";
import { Header } from "../components/header/Header";

import "../styles/Global.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};