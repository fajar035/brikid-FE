import styles from "./styles.module.css";
import CategoryMenu from "../../components/MenuCategory";
import Card from "../../components/Card";
import Loading from "../../components/LoadingCard";
import dataNotFound from "../../assets/img/dataNotFound.webp";

import { getAllProductsApi } from "../../utils/https/product";
import { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { useNavigate } from "react-router-dom";

function index() {
  const [selectCategory, setSelectCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const category = useSelector((state) => state.category.data);
  const navigate = useNavigate();
  const handleSelectCategory = (select) => setSelectCategory(select);
  const debounceCategory = useDebounce(selectCategory, 1000);
  const token = useSelector((state) => state.auth.userData.token);

  const getAllProducts = useCallback(async () => {
    setIsLoading(true);
    const params = {
      page,
      limit: 5,
      sort: "desc",
      order: "id",
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
  }, [debounceCategory, page]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // useEffect(() => {
  //   console.log("TOKEN : ", token);
  // }, [token]);

  return (
    <>
      <section className={styles["products"]}>
        <CategoryMenu category={category} handleSelect={handleSelectCategory} />

        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles["products_wrapper"]}>
            {products.length === 0 ? (
              <img src={dataNotFound} />
            ) : (
              products.length !== 0 &&
              products.map((product, idx) => (
                <Card key={idx} product={product} />
              ))
            )}
          </div>
        )}

        {token.length !== 0 ? (
          <div className={styles["wrapper-btn"]}>
            <button onClick={() => navigate("/product/add-product")}>
              Add product
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default index;
