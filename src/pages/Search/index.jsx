import styles from "./styles.module.css";
import { getAllProductsApi } from "../../utils/https/product";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import Loading from "../../components/LoadingCard";
import ImageNotFound from "../../assets/img/dataNotFound.webp";

function index() {
  const search = useSelector((state) => state.loading.search);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = useCallback(async (search) => {
    setIsLoading(true);
    try {
      const params = {
        search,
      };

      const res = await getAllProductsApi(params);
      setProduct(res.data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProduct(search);
  }, [getProduct, search]);

  return (
    <section className={styles["search"]}>
      <div className={styles["search_title"]}>
        <p>Search</p>
      </div>
      <div className={styles["search_product"]}>
        {product.length !== 0 &&
          product.map((item, idx) => (
            <>{isLoading ? <Loading /> : <Card key={idx} product={item} />}</>
          ))}

        {product.length === 0 ? <img src={ImageNotFound} alt="image" /> : null}
      </div>
    </section>
  );
}

export default index;
