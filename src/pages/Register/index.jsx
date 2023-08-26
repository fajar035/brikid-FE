import styles from "../Login/styles.module.css";
import Footer from "../../components/Footer";
import loginImg from "../../assets/img/login-img.webp";
import logo from "../../assets/icons/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { useState } from "react";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import { registerApi } from "../../utils/https/auth";

function index() {
  const dimention = useWindowDimensions();
  const { width } = dimention;
  const navigate = useNavigate();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [shownPass, setShownPass] = useState(false);

  const handleShowPassword = () => setShownPass(!shownPass);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await toast.promise(registerApi(body), {
        pending: "Loading ..",
        success: "Sign up Successfully 👌",
        error: "Please enter correct email and password",
      });
      if (res) return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className={styles["login"]}>
      <div className={styles["wrapper-login"]}>
        {width > 768 ? (
          <>
            <div className={styles["login_img"]}>
              <img src={loginImg} alt="img" />
            </div>
          </>
        ) : null}

        <div className={styles["login_form"]}>
          <div className={styles["header"]}>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
              <p className={styles["logo_title"]}>Kelontong Shop</p>
            </div>
            <p className={styles["header_title"]}>Sign Up</p>
          </div>
          <form className={styles["form"]} onSubmit={handleSubmit}>
            <div className={styles["form-input"]}>
              <label htmlFor="email">Email Address : </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email adress"
                onChange={(e) => setBody({ ...body, email: e.target.value })}
              />
            </div>
            <div className={styles["form-input"]}>
              <label htmlFor="password">Password : </label>
              <div className={styles["input_password"]}>
                <input
                  type={shownPass ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) =>
                    setBody({ ...body, password: e.target.value })
                  }
                />
                <div
                  onClick={handleShowPassword}
                  className={styles["wrapper-icon"]}>
                  {shownPass ? (
                    <UilEye className="icon" width="50" />
                  ) : (
                    <UilEyeSlash className="icon" width="100" />
                  )}
                </div>
              </div>
            </div>

            <button type="submit" className={styles["btn-login"]}>
              Sign up
            </button>
          </form>
          <div className={styles["havent-account"]}>
            <div>
              <hr />
            </div>
            <p>Already have an account?</p>
            <div>
              <hr />
            </div>
          </div>

          <Link className={styles["btn-signup"]} to="/login">
            Login Here
          </Link>
          <div className={styles["wrapper-login"]}></div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default index;
