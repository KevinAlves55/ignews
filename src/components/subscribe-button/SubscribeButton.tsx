import { useSession, signIn } from "next-auth/react";
import { Api } from "../../services/Api";
import { getStripeJs } from "../../services/Stripe-js";
import Style from "./Style.module.scss";

interface ISubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton: React.FC<ISubscribeButtonProps> = ({ priceId }) => {
  const { data: session } = useSession();

  const handleSubscribe = async () => {
    if (!session) {
      signIn("github")
      return;
    }

    try {
      const res = await Api.post("/subscribe")

      const { sessionId } = res.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      type="button"
      className={Style.subscribeButton}
      onClick={() => handleSubscribe()}
    >
      Subscribe now
    </button>
  );
};