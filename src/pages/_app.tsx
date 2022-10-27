import { AppProps } from "next/app";
import { Header } from "../components/header/Header";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import "../styles/Global.scss";

export default function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
};