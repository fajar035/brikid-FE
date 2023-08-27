import styles from "./styles.module.css";
import { addProductApi } from "../../utils/https/product";
import { useRef, useState } from "react";
import IAddImage from "../../assets/icons/IAddImage.webp";
import { useSelector } from "react-redux";
import Dropdown from "../../components/DropdownCategory";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { toast } from "react-toastify";
import loader from "../../assets/icons/loader.svg";
import { useNavigate } from "react-router-dom";

function index() {
  const navigate = useNavigate();
  const category = useSelector((state) => state.category.data);
  const token = useSelector((state) => state.auth.userData.token);
  const dimention = useWindowDimensions();
  const { width } = dimention;
  const inputRef = useRef();

  // const [isLoading, setIsLoading] = useState(false);
  const [body, setIsBody] = useState({});
  const [isDropdown, setIsDropdown] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const pickImageRef = () => inputRef.current.click();

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    setIsBody((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(file),
      imageBody: file,
    }));
  };

  const handleDropdown = () => setIsDropdown(!isDropdown);

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

    let isError = false;
    if (
      !body.name ||
      !body.description ||
      !body.price ||
      !body.categoryId ||
      !body.weight
    ) {
      isError = true;
      setLoadingUpdate(false);
      toast.error("Isi yang bener cuy");
    } else {
      isError = false;
    }

    if (!isError) {
      addProductApi(formData, token)
        .then((res) => {
          setLoadingUpdate(false);
          toast.success("Add product successfully ..");
          navigate(`/product/${res.data.result.id}`);
        })
        .catch((err) => {
          setLoadingUpdate(false);
          toast.error(err.response.data.errMsg);
        });
    }
  };

  return (
    <section className={styles["detail_product"]}>
      <div className={styles["detail_left"]}>
        <div className={`${styles["left_wrapper"]}`} onClick={pickImageRef}>
          {body.imageBody ? (
            <img src={body.image} />
          ) : (
            <img src={IAddImage} className={styles["add-image"]} />
          )}
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

        <input
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
                onClick={(e) => handleSelectSize(e)}
                className={
                  body.weight === 100 ? styles["selected-btn-size"] : ""
                }>
                S
              </button>
              <button
                value="300"
                onClick={(e) => handleSelectSize(e)}
                className={
                  body.weight === 300 ? styles["selected-btn-size"] : ""
                }>
                M
              </button>

              <button
                value="500"
                onClick={(e) => handleSelectSize(e)}
                className={
                  body.weight === 500 ? styles["selected-btn-size"] : ""
                }>
                L
              </button>
            </div>
          </div>
        </div>

        <button
          className={styles["btn_save"]}
          onClick={handleSaveProduct}
          disabled={loadingUpdate ? true : false}>
          Save product{" "}
          {loadingUpdate ? (
            <img src={loader} className={styles.spinner} />
          ) : null}
        </button>
      </div>
    </section>
  );
}

export default index;
