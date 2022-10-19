import Styles from "./Style.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <a className={Styles.active}>Home</a>
          <a>Posts</a>
        </nav>
      </div>
    </header>
  );
};