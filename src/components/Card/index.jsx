import styles from "./styles.module.css";
import { numberToRupiah } from "../../utils/helpers/currency";

function index({ product }) {
  return (
    <div className={styles.card}>
      <img src={product.image} alt="food" />
      <p className={styles.title}>{product.name}</p>
      <p className={styles.price}>Rp. {numberToRupiah(product.price)}</p>
    </div>
  );
}

export default index;
