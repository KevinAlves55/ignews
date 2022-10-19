import Style from "./Style.module.scss";

interface ISubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton: React.FC<ISubscribeButtonProps> = ({ priceId }) => {
  return (
    <button
      type="button"
      className={Style.subscribeButton}
    >
      Subscribe now
    </button>
  );
};