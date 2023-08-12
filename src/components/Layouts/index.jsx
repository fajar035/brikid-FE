import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { getCategoryAction } from "../../redux/actions/category.js";

function Layout() {
  const dispatch = useDispatch();
  dispatch(getCategoryAction());

  useEffect(() => {
    const body = document.querySelector("#root");

    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
