import styles from "./navbar.module.css";
import logo from "../../assets/icons/logo.svg";
import ISearch from "../../assets/icons/iSearch.svg";
import { Squash } from "hamburger-react";
import NavbarPublic from "./Public";
import NavbarPrivate from "./Private";
import { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { searchAction } from "../../redux/actions/loading";

function Navbar() {
  const dimention = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userData.token);

  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const { width } = dimention;

  const resolvePath = useResolvedPath();
  const pathName = resolvePath.pathname;

  const handleClickSearch = () => {
    setIsSearch(false);
    dispatch(searchAction(search));
    navigate("/search", { state: { search } });
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <nav className={styles.nav}>
      <div className={styles["nav_logo"]}>
        <img src={logo} alt="logo" />
        <p className={styles["nav_title"]}>Kelontong Shop</p>
      </div>

      <ul className={`${styles["menu"]} ${isOpen ? styles.open : ""}`}>
        {width >= 768 ? (
          <li
            className={`${styles["wrapper_search"]} ${
              isSearch ? styles["isSearch--wrapper"] : ""
            }`}>
            <input
              type="text"
              name="search"
              placeholder="Search ..."
              className={`${isSearch ? styles["isSearch--input"] : ""}`}
              onMouseEnter={() => setIsSearch(true)}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              src={ISearch}
              alt="search"
              width={20}
              className={styles["icon_search"]}
              onMouseEnter={() => setIsSearch(true)}
              onClick={handleClickSearch}
            />
          </li>
        ) : null}
        <li>
          <Link
            className={`${styles["link"]} ${
              pathName === "/products" ? styles.active : ""
            }`}
            to="/products">
            Products
          </Link>
        </li>

        {/* {token ? (
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
        ) : null} */}
        {token ? <NavbarPrivate /> : <NavbarPublic />}
      </ul>

      {width <= 768 ? (
        <Squash toggled={isOpen} toggle={setIsOpen} color="#393939" />
      ) : null}
    </nav>
  );
}

export default Navbar;
