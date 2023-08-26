import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { getProductDetailApi } from "../../utils/https/product";
import { useEffect, useState } from "react";

function index() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const getProduct = async (id) => {
    setIsLoading(true);
    try {
      const res = await getProductDetailApi(id);
      setProduct(res.data.result[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <section className={styles["detail_product"]}>
      <div className={styles["detail_left"]}>
        <p>left</p>
      </div>
      <div className={styles["detail_right"]}>
        <p>right</p>
      </div>
    </section>
  );
}

export default index;
