import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, useSession, signOut } from "next-auth/react";

import Style from "./Style.module.scss";

export const SingInButton: React.FC = () => {
  const { data: session } = useSession();

  return session ? (
    <button
      className={Style.singInButton}
      type="button"
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={Style.closeIcon} />
    </button>
  ) : (
    <button
      className={Style.singInButton}
      type="button"
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  );
};