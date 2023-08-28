import styles from "./styles.module.css";
import { getAllProductsApi } from "../../utils/https/product";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card";
import Loading from "../../components/LoadingCard";
import ImageNotFound from "../../assets/img/dataNotFound.webp";
import ISearch from "../../assets/icons/iSearch.svg";
import { searchAction } from "../../redux/actions/loading";
import useWindowDimensions from "../../utils/hooks/useDimensions.js";

function index() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.loading.search);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dimention = useWindowDimensions();
  const { width } = dimention;

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

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchAction(e.target.search.value));
  };

  useEffect(() => {
    getProduct(search);
  }, [getProduct, search]);

  return (
    <section className={styles["search"]}>
      <div className={styles["search_title"]}>
        <p>Search</p>
        {width <= 768 ? (
          <form className={styles["search_input"]} onSubmit={handleSearch}>
            <input type="text" placeholder="Search .." name="search" />
            <img src={ISearch} alt="icon" width={20} />
          </form>
        ) : null}
      </div>
      <div className={styles["search_product"]}>
        {product.length !== 0 &&
          product.map((item, idx) => (
            <div key={idx}>
              {isLoading ? <Loading /> : <Card key={idx} product={item} />}
            </div>
          ))}

        {product.length === 0 && isLoading === false ? (
          <img src={ImageNotFound} alt="image" />
        ) : null}
      </div>
    </section>
  );
}

export default index;
