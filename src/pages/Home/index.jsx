import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function index() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/") return navigate("/products");
  }, [pathname, navigate]);
}

export default index;
