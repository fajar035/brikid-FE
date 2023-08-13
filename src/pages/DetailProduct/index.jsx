import { useParams } from "react-router-dom";
import styles from "./styles.module.css";

function index() {
  const params = useParams();
  const { id } = params;
  return (
    <section className={styles["detail_product"]}>
      <p>Detail Product {id}</p>
    </section>
  );
}

export default index;
