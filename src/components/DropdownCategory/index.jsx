import { useEffect, useState, Fragment } from "react";
import styles from "./styles.module.css";
import { UilAngleUp, UilAngleDown } from "@iconscout/react-unicons";

function index({
  title = "Select Category",
  list = [],
  handleSelectCategory,
  isDropdown,
  handleDropdown,
}) {
  return (
    <div className={styles["dd-wrapper"]}>
      <div className={styles["dd-header"]}>
        <button
          className={styles["btn_header"]}
          onClick={() => handleDropdown(!isDropdown)}>
          {title}
        </button>
        {isDropdown ? (
          <UilAngleUp className={`icon ${styles["icon-dd"]}`} />
        ) : (
          <UilAngleDown className={`icon ${styles["icon-dd"]}`} />
        )}
      </div>
      <div
        className={`${styles["dd-list"]} ${
          isDropdown ? styles["--open"] : ""
        }`}>
        <p>Select Category</p>
        {list.slice(1).map((item, idx) => (
          <Fragment key={idx + 1}>
            <p onClick={() => handleSelectCategory(idx + 1)}>{item.name}</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default index;
