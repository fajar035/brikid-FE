/* eslint-disable react/jsx-key */
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

function index({ category = [], handleSelect, setPage }) {
  const [menuActive, setMenuActive] = useState("");

  const handleMenu = (name) => {
    setMenuActive(name);
    setPage(1);
  };

  useEffect(() => {
    handleSelect(menuActive);
    console.log(menuActive);
  }, [menuActive, handleSelect]);

  return (
    <div className={styles.category}>
      <ul className={styles["product_category"]}>
        {category.length !== 0 &&
          category.map((item, idx) => {
            return (
              <li
                className={`${styles["category-item"]} ${
                  item.name === menuActive ? styles["category-active"] : ""
                }`}
                onClick={() => handleMenu(item.name)}
                key={idx}>
                {item.name === "" ? "All" : item.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default index;
