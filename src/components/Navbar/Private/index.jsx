import { useEffect, useState } from "react";
import styles from "./private.module.css";
import photoDefault from "../../../assets/icons/IProfileDefault.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { logoutAction } from "../../../redux/actions/auth";
import {
  onLoadingAction,
  offLoadingAction,
} from "../../../redux/actions/loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavbarPrivate() {
  const token = useSelector((state) => state.auth.userData.token);
  const photo = useSelector((state) => state.auth.userData.photo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [photoProfile, setPhotoProfile] = useState(photoDefault);
  const { pathname } = location;

  const handleMenuProfile = () => setIsMenuOpen(!isMenuOpen);
  const handlerLogout = (token) => {
    if (pathname === "/profile") {
      navigate("/");
    }
    dispatch(onLoadingAction());
    Swal.fire({
      title: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logoutAction(token))
          .then((res) => {
            const { type } = res.action;
            if (type === "AUTH_LOGOUT_FULFILLED") {
              toast.success("Logout successfully ..", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
              const waitingToast = setTimeout(() => {
                return navigate("/");
              }, 2000);
              dispatch(offLoadingAction());
              return waitingToast;
            }
          })
          .catch((err) => {
            dispatch(offLoadingAction());
            if (err)
              return toast.error("Logout failed, please check again ..", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
          });
      } else if (res.isDismissed) {
        dispatch(offLoadingAction());
      }
    });
  };

  useEffect(() => {
    if (photo !== null && photo.length !== 0) return setPhotoProfile(photo);
    return setPhotoProfile(photoDefault);
  }, [photo]);

  return (
    <>
      <li className={styles["nav"]}>
        <div
          onClick={handleMenuProfile}
          className={styles["wrapper-img-profile"]}>
          <img
            src={photoProfile}
            alt="icon"
            className={styles["profile-img"]}
          />
          <ul
            className={`${styles["wrapper-menu"]} ${
              isMenuOpen ? styles["open"] : null
            }`}>
            <li onClick={() => handlerLogout(token)}>Log Out</li>
          </ul>
        </div>
      </li>
    </>
  );
}

export default NavbarPrivate;
