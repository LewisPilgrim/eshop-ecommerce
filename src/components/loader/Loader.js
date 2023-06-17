import styles from "./Loader.module.scss";
import loaderImg from "../../assets/loader.gif";
import { createPortal } from "react-dom";

const Loader = () => {
  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt='Loading...' />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
