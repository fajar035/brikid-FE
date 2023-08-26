import { useEffect, useState } from "react";
import styles from "./styles.module.css";

function index({ data = [], handleParams }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [item, setItem] = useState([]);

  const handlePage = (idx) => setPage(idx);

  useEffect(() => {
    if (data.length !== 0) {
      const totalPage = Math.ceil(data.length / limit);
      setItem([...data].slice(0, totalPage));
    }
  }, [data, limit]);

  useEffect(() => {
    handleParams("page", page);
  }, [page, handleParams]);

  return (
    <>
      {data.length !== 0 && (
        <ul className={styles["pagination"]}>
          <li>Prev</li>
          {item.length !== 0 &&
            item.map((_, idx) => (
              <li key={idx} onClick={() => handlePage(idx + 1)}>
                {idx + 1}
              </li>
            ))}
          <li>Next</li>
        </ul>
      )}
    </>
  );
}

export default index;
