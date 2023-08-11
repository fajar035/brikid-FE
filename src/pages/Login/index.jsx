import styles from "../Login/styles.module.css";
import Footer from "../../components/Footer";
import loginImg from "../../assets/img/login-img.svg";
import logo from "../../assets/icons/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import useWindowDimensions from "../../utils/hooks/useDimensions";
import { useEffect, useState } from "react";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";
import { loginAction } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function index() {
  const dimention = useWindowDimensions();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { width } = dimention;
  const token = useSelector((state) => state.auth.userData.token);
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const [shownPass, setShownPass] = useState(false);

  const handleShowPassword = () => setShownPass(!shownPass);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await toast.promise(dispatch(loginAction(body)), {
        pending: "Loading ..",
        success: "Login Successfully 👌",
        error: "Please enter correct email and password",
      });
      if (res) return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token.length !== 0) return navigate("/");
  }, [token, navigate]);

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
            <p className={styles["header_title"]}>Login</p>
          </div>
          <form className={styles["form"]} onSubmit={handleSubmit}>
            <div className={styles["form-input"]}>
              <label htmlFor="email">Email Address : </label>
              <input
                type="email"
                id="email"
                className={styles["input_email"]}
                placeholder="Enter your email address"
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
              Login
            </button>
          </form>
          <div className={styles["havent-account"]}>
            <div>
              <hr />
            </div>
            <p>Don’t have an account?</p>
            <div>
              <hr />
            </div>
          </div>

          <Link className={styles["btn-signup"]} to="/register">
            Sign up Here
          </Link>
          <div className={styles["wrapper-login"]}></div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default index;
