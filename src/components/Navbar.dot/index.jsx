import styles from "./styles.module.css";
import Logo from "../../assets/logo.svg";
import ISearch from "../../assets/iSearch.svg";
import IProfileDefault from "../../assets/IProfileDefault.svg";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

function index() {
  const location = useLocation();

  const { pathname } = location;
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  useEffect(() => {
    if (pathname === "/products") {
      setIsActiveMenu(true);
    }

    return () => {
      setIsActiveMenu(false);
    };
  }, [pathname]);
  console.log(isActiveMenu);
  return (
    <div className={styles["navbar"]}>
      <div className={styles["navbar_logo"]}>
        <img src={Logo} alt="logo" width={20} />
        <p className={styles["navbar_logo_title"]}>Coffee Shop</p>
      </div>

      <ul className={styles["navbar_menu"]}>
        <li>
          <Link
            to="/products"
            className={`${styles["navbar_link"]} ${
              isActiveMenu ? styles["active"] : ""
            }`}>
            Products
          </Link>
        </li>
      </ul>

      <div className={styles["navbar_profile"]}>
        <img src={ISearch} alt="icon" width={30} />
        <div className={styles["navbar_profile_img"]}>
          <Link to="/profile">
            <img src={IProfileDefault} alt="profile" width={50} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
