import Link from "next/link";
import { useRouter } from "next/router";
import { ActiveLink } from "../active-link/ActiveLink";
import { SingInButton } from "./components/sing-in-button/SingInButton";
import Styles from "./Style.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <ActiveLink activeClassName={Styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={Styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SingInButton />
      </div>
    </header>
  );
};