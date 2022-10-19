import { GetServerSideProps } from "next"
import Head from 'next/head';
import { SubscribeButton } from '../components/subscribe-button/SubscribeButton';

import Style from "./Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={Style.contentContainer}>
        <section className={Style.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.90 month</span>
          </p>
          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      name: "Kevin"
    }
  }
};