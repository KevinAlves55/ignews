import Style from "./Style.module.scss";

export const SubscribeButton: React.FC = () => {
  return (
    <button
      type="button"
      className={Style.subscribeButton}
    >
      Subscribe now
    </button>
  );
};