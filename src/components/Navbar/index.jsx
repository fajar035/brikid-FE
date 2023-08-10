import styles from "./navbar.module.css";
import logo from "../../assets/icons/logo.svg";
import { Squash } from "hamburger-react";
import NavbarPublic from "./Public";
import NavbarPrivate from "./Private";
import { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { useSelector } from "react-redux";
import { Link, useResolvedPath } from "react-router-dom";

function Navbar() {
  const token = useSelector((state) => state.auth.userData.token);

  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowDimensions();

  const resolvePath = useResolvedPath();
  const pathName = resolvePath.pathname;

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <nav className={styles.nav}>
      <div className={styles["nav_logo"]}>
        <img src={logo} alt="logo" />
        <p className={styles["nav_title"]}>Coffee Shop</p>
      </div>

      <ul className={`${styles["menu"]} ${isOpen ? styles.open : ""}`}>
        <li>
          <Link
            className={`${styles["link"]} ${
              pathName === "/products" ? styles.active : ""
            }`}
            to="/products">
            Products
          </Link>
        </li>
        {token ? (
          <>
            <li>
              <Link
                className={`${styles["link"]} ${
                  pathName === "/profile" ? styles.active : ""
                }`}
                to="/profile">
                Profile
              </Link>
            </li>
          </>
        ) : null}
        {token ? <NavbarPrivate /> : <NavbarPublic />}
      </ul>

      {width <= 768 ? (
        <Squash toggled={isOpen} toggle={setIsOpen} color="#393939" />
      ) : null}
    </nav>
  );
}

export default Navbar;
