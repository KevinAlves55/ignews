import Link from "next/link";
import { SingInButton } from "./components/sing-in-button/SingInButton";
import Styles from "./Style.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <Link href="/">
            <a className={Styles.active}>Home</a>
          </Link>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </nav>

        <SingInButton />
      </div>
    </header>
  );
};