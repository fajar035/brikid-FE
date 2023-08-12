import styles from "./styles.module.css";
import CategoryMenu from "../../components/MenuCategory";
import Pagination from "../../components/Pagination";
import Card from "../../components/Card";
import { getAllProductsApi } from "../../utils/https/product";
import { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDebounce } from "../../utils/hooks/useDebounce";

function index() {
  const [selectCategory, setSelectCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const category = useSelector((state) => state.category.data);

  const handleSelectCategory = (select) => setSelectCategory(select);
  const debounceCategory = useDebounce(selectCategory, 1000);

  const getAllProducts = useCallback(async () => {
    setIsLoading(true);
    const params = {
      page,
      limit: 5,
      category: debounceCategory,
    };
    try {
      const res = await getAllProductsApi(params);
      setProducts(res.data.result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [debounceCategory]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <>
      <section className={styles["products"]}>
        <CategoryMenu category={category} handleSelect={handleSelectCategory} />

        <div className={styles["products_wrapper"]}>
          {isLoading ? (
            <p>Loading</p>
          ) : products.length === 0 ? (
            <p>Data not found</p>
          ) : (
            products.length !== 0 &&
            products.map((product, idx) => <Card key={idx} product={product} />)
          )}
        </div>
      </section>
    </>
  );
}

export default index;
