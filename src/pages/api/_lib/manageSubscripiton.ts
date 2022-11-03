import { Fauna } from "../../../services/Fauna";
import { Collections, Create, query as q } from "faunadb";
import { stripe } from "../../../services/Stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // Buscar o user do db fauna com o ID customerId
  // Salvar os dados da Subscription do User no DB
  const userRef = await Fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index("user_by_stripe_customer_id"),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  await Fauna.query(
    q.Create(
      q.Collection("subscriptions"),
      { data: subscriptionData }
    )
  )
}