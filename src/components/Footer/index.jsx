import styles from "./styles.module.css";
import logo from "../../assets/icons/logo.svg";
import IFacebook from "../../assets/icons/iFb.svg";
import ITwitter from "../../assets/icons/iTwitter.svg";
import iInstagram from "../../assets/icons/iInstagram.svg";
import { useSelector } from "react-redux";

function index() {
  const category = useSelector((state) => state.category.data);

  return (
    <section className={styles["footer"]}>
      <div className={styles["footer_intro"]}>
        <div className={styles["logo"]}>
          <img src={logo} alt="logo" />
          <p>Kelontong Shop</p>
        </div>

        <p className={styles.description}>
          Coffee Shop is a store that sells some good meals, and especially
          coffee. We provide high quality beans
        </p>

        <div className={styles["wrapper-icon"]}>
          <img src={IFacebook} alt="icon" />
          <img src={ITwitter} alt="icon" />
          <img src={iInstagram} alt="icon" />
        </div>

        <p className={styles.tag}>©2020CoffeeStore</p>
      </div>
      <div className={styles["footer_menu"]}>
        <ul className={styles.menu}>
          <li>Product</li>
          {category?.map((item, idx) => (
            <li key={idx}>{item.name}</li>
          ))}
        </ul>

        <ul className={styles.menu}>
          <li>Engage</li>
          <li>Coffee Shop</li>
          <li>FAQ</li>
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
    </section>
  );
}

export default index;
