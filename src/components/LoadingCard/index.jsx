import styles from "./styles.module.css";
const data = [1, 2, 3, 4, 5];

function index() {
  return (
    <section className={styles.skeleton}>
      {data.map((item) => (
        <div key={item} className={styles["skeleton_card"]}></div>
      ))}
    </section>
  );
}

export default index;
