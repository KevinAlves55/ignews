import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Style from "./Style.module.scss";

export const SingInButton: React.FC = () => {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button
      className={Style.singInButton}
      type="button"
    >
      <FaGithub color="#04d361" />
      Kevin Alves
      <FiX color="#737380" className={Style.closeIcon} />
    </button>
  ) : (
    <button
      className={Style.singInButton}
      type="button"
    >
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  );
};