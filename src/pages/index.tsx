import { GetServerSideProps } from "next"
import Head from 'next/head';
import { SubscribeButton } from '../components/subscribe-button/SubscribeButton';
import { stripe } from "../services/Stripe";

import Style from "./Home.module.scss";

interface IHomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: IHomeProps) {
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
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1Lui3dHI2CZCD5DPtaZfTW2q");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    }
  }
};