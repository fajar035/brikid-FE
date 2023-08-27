import styles from "./styles.module.css";
import pageNotFound from "../../assets/img/pageNotFound.webp";
import { Link } from "react-router-dom";

function index() {
  return (
    <div className={styles.pageError}>
      <img src={pageNotFound} alt="image" />
      <h1>Page not found</h1>
      <p>
        The page you are looking for doesn&apos;t exist or an other error
        accurred <Link to={-1}>Go Back</Link> or go to <Link to="/">Home</Link>
      </p>
    </div>
  );
}

export default index;
