import styles from "./styles.module.css";
import CategoryMenu from "../../components/MenuCategory";
import Card from "../../components/Card";
import Loading from "../../components/LoadingCard";
import dataNotFound from "../../assets/img/dataNotFound.webp";
import ISearch from "../../assets/icons/iSearch.svg";

import { getAllProductsApi } from "../../utils/https/product";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../utils/hooks/useDimensions.js";
import { searchAction } from "../../redux/actions/loading";

function index() {
  const dimention = useWindowDimensions();
  const dispatch = useDispatch();
  const { width } = dimention;
  const [selectCategory, setSelectCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const category = useSelector((state) => state.category.data);
  const navigate = useNavigate();

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
      setTotalPage(res.data.meta.totalPage);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [debounceCategory, page]);

  const handleSelectCategory = (select) => {
    setSelectCategory(select);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchAction(e.target.search.value));
    navigate("/search");
  };

  useEffect(() => {
    if (width < 500) {
      setIsSearch(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      setIsSearch(false);
    }
  }, [width, page]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <>
      <section className={styles["products"]}>
        {isSearch ? (
          <div className={styles["wrapper-search"]}>
            <form className={styles["search"]} onSubmit={handleSearch}>
              <input type="text" placeholder="Search .." name="search" />
              <img src={ISearch} alt="search" width={20} />
            </form>
          </div>
        ) : null}

        <CategoryMenu
          category={category}
          handleSelect={handleSelectCategory}
          setPage={setPage}
        />

        {isLoading ? (
          <Loading />
        ) : (
          <>
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

            <div className={styles["wrapper-pagination"]}>
              <button onClick={() => (page > 1 ? setPage(page - 1) : null)}>
                prev
              </button>
              <p>{page}</p>
              <button
                onClick={() => (page < totalPage ? setPage(page + 1) : null)}>
                next
              </button>
            </div>
          </>
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
