import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import {
  getProductDetailApi,
  updateProductApi,
} from "../../utils/https/product";
import { useEffect, useRef, useState } from "react";
import { UilEdit } from "@iconscout/react-unicons";
import Skeleton from "react-loading-skeleton";
import { numberToRupiah } from "../../utils/helpers/currency";
import { useSelector } from "react-redux";
import Dropdown from "../../components/DropdownCategory";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { toast } from "react-toastify";
import loader from "../../assets/icons/loader.svg";

function index() {
  const category = useSelector((state) => state.category.data);
  const token = useSelector((state) => state.auth.userData.token);
  const dimention = useWindowDimensions();
  const { width } = dimention;
  const params = useParams();
  const inputRef = useRef();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [body, setIsBody] = useState({});
  const [isDropdown, setIsDropdown] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const getProduct = async (id) => {
    setIsLoading(true);
    try {
      const res = await getProductDetailApi(id);
      const product = res.data.result[0];
      setIsBody((prevState) => ({
        ...prevState,
        name: product.name,
        description: product.description,
        weight: product.weight,
        price: product.price,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        image: product.image,
      }));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const pickImageRef = () => inputRef.current.click();

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setIsBody((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(file),
      imageBody: file,
    }));
  };

  const handleDropdown = () => {
    if (isEdit) {
      setIsDropdown(!isDropdown);
    }
  };

  const handleSelectCategory = (idx) => {
    setIsBody((prevState) => ({
      ...prevState,
      categoryId: idx,
      categoryName: category[idx].name,
    }));
    setIsDropdown(false);

    if (width >= 500) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSelectSize = (e) => {
    setIsBody((prevState) => ({
      ...prevState,
      weight: parseInt(e.target.value),
    }));
  };

  const handleSaveProduct = () => {
    setLoadingUpdate(true);
    const formData = new FormData();
    if (!body.imageBody) {
      formData.append("image", body.image);
    } else {
      formData.append("image", body.imageBody);
    }

    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("price", body.price);
    formData.append("category", body.categoryId);
    formData.append("weight", body.weight);
    formData.append("height", 0);
    formData.append("width", 0);
    formData.append("length", 0);

    updateProductApi(id, formData, token)
      .then(() => {
        setLoadingUpdate(false);
        setIsEdit(false);
        toast.success("Update product successfully ..");
        getProduct(id);
      })
      .catch((err) => {
        setLoadingUpdate(false);
        setIsEdit(false);
        getProduct(id);
        toast.error(err.response.data.errMsg);
      });
  };

  useEffect(() => {
    fetch(body.image).then((res) => {
      if (res.status === 404) {
        setIsBody((prevState) => ({
          ...prevState,
          image: undefined,
        }));
      }
    });
  }, [body.image]);

  useEffect(() => {
    getProduct(id);
  }, [id]);

  return (
    <section className={styles["detail_product"]}>
      <div className={styles["detail_left"]}>
        <div
          className={`${styles["left_wrapper"]} ${
            isLoading
              ? styles["--loading"]
              : !body.image
              ? styles["--loading"]
              : ""
          }`}>
          {isEdit ? (
            <div className={styles["left_btn_del"]} onClick={pickImageRef}>
              <UilEdit />
            </div>
          ) : null}
          {body.image ? <img src={body.image} /> : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleUploadImage(e)}
          />
        </div>
      </div>
      <div className={styles["detail_right"]}>
        {isLoading ? (
          <Skeleton height={50} count={5} style={{ marginBottom: "10px" }} />
        ) : (
          <>
            {isEdit ? (
              <input
                type="text"
                defaultValue={body.name}
                placeholder="Product Name .."
                id="name"
                className={`${styles.input} ${styles["--title"]}`}
                onChange={(e) =>
                  setIsBody((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
            ) : (
              <p className={styles["right_title"]}>{body.name}</p>
            )}

            {isEdit ? (
              <input
                type="number"
                defaultValue={body.price}
                placeholder="Product Price .."
                id="price"
                className={`${styles.input}  ${styles["--price"]}`}
                onChange={(e) =>
                  setIsBody((prevState) => ({
                    ...prevState,
                    price: e.target.value,
                  }))
                }
              />
            ) : (
              <p className={styles["right_price"]}>
                Rp. {numberToRupiah(body.price)}
              </p>
            )}

            {isEdit ? (
              <textarea
                rows={3}
                defaultValue={body.description}
                placeholder="Product Description .."
                id="description"
                className={`${styles.input}  ${styles["--description"]}`}
                onChange={(e) =>
                  setIsBody((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
              />
            ) : (
              <p className={styles["right_description"]}>{body.description}</p>
            )}

            <div className={styles["right_options"]}>
              <Dropdown
                title={body.categoryName}
                list={category}
                handleSelectCategory={handleSelectCategory}
                handleDropdown={handleDropdown}
                isDropdown={isDropdown}
              />
              <div className={styles["size-wrapper"]}>
                <p>Choose a size</p>
                <div className={styles["wrapper-btn-size"]}>
                  <button
                    value="100"
                    onClick={(e) => (isEdit ? handleSelectSize(e) : null)}
                    className={
                      body.weight === 100 ? styles["selected-btn-size"] : ""
                    }>
                    S
                  </button>
                  <button
                    value="300"
                    onClick={(e) => (isEdit ? handleSelectSize(e) : null)}
                    className={
                      body.weight === 300 ? styles["selected-btn-size"] : ""
                    }>
                    M
                  </button>
                  <button
                    value="500"
                    onClick={(e) => (isEdit ? handleSelectSize(e) : null)}
                    className={
                      body.weight === 500 ? styles["selected-btn-size"] : ""
                    }>
                    L
                  </button>
                </div>
              </div>
            </div>

            {token ? (
              !isEdit ? (
                <button
                  className={styles["btn_edit"]}
                  onClick={() => setIsEdit(true)}>
                  Edit Product
                </button>
              ) : (
                <button
                  className={styles["btn_save"]}
                  onClick={handleSaveProduct}
                  disabled={loadingUpdate ? true : false}>
                  Save change{" "}
                  {loadingUpdate ? (
                    <img src={loader} className={styles.spinner} />
                  ) : null}
                </button>
              )
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}

export default index;
