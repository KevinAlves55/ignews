import { stripe } from './../../services/Stripe';
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { Fauna } from '../../services/Fauna';
import { query as q } from 'faunadb';

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req });

    const user = await Fauna.query<User>(
      q.Get(
        q.Match(
          q.Index("user_by_email"),
          q.Casefold(session.user.email)
        )
      )
    );

    let customerId = user.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
        // metadata
      });

      await Fauna.query(
        q.Update(
          q.Ref(q.Collection("users"), user.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id,
            }
          }
        )
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      // 
      customer: customerId,

      // Métodos de pagamento que vamos ter
      payment_method_types: ["card"],

      // Informa se o endereço deve ser obrigatória
      billing_address_collection: "required",

      // Informa os itens que podem ser comprados
      line_items: [
        { price: "price_1Lui3dHI2CZCD5DPtaZfTW2q", quantity: 1 }
      ],

      // Se o pagamento vai ser recorrente ou apenas uma vez
      mode: "subscription",

      // Informa se terá cumpom de desconto
      allow_promotion_codes: true,

      // Informar as url necessárias para redirecionamento
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return res.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};