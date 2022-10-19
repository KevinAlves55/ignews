import { version } from "../../package.json";
import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    // @ts-ignore stripe-version-2022-08-01
    apiVersion: "2020-08-27",
    appInfo: {
      name: "ignews",
      version
    },
  }
);