import { Link } from "react-router";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>
          Oh no! The route you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.homeLink}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
