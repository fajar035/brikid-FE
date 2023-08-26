import styles from "./styles.module.css";
import { numberToRupiah } from "../../utils/helpers/currency";
import { useNavigate } from "react-router-dom";

function index({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/product/${product.id}`)}>
      <img src={product.image} alt="food" />
      <p className={styles.title}>{product.name}</p>
      <p className={styles.price}>Rp. {numberToRupiah(product.price)}</p>
    </div>
  );
}

export default index;
