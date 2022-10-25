import { GetStaticProps } from "next"
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

/**
 * Existem 3 formas de fazer uma chamada a API no react
 * - Client-side: Para qualquer outro caso a não ser os requisitos abaixo
 * - Server-side: Quando precisamos dos dados em tempo real(SSR)
 * - Static: Casos que eu queira compartilhar o mesmo HTML para várias pessoas(SSG)
*/

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

export const getStaticProps: GetStaticProps = async () => {
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
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
};