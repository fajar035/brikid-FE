import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/hooks/scrollToTop";
import Layout from "./components/Layouts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Profile from "./pages/Profile/";
import Home from "./pages/Home";
import DetailProducts from "./pages/DetailProduct";
import AddProduct from "./pages/AddProduct";
import ErrorPage from "./pages/ErrorPage";

function MainRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<DetailProducts />} />
            <Route path="/product/add-product" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default MainRouter;
