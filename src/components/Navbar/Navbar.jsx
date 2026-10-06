import { Link, useNavigate } from "react-router";
import { signOut } from "../../api/signOut";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("Authorization");

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link to={"/"} className={styles.homeLink}>
          Home
        </Link>
      </div>

      <div className={styles.navLinks}>
        {localStorageToken ? (
          <>
            <Link className={styles.primaryLink} to={"/posts/add"}>
              Add Post
            </Link>
            <button className={styles.signOutBtn} onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link className={styles.link} to={"/login"}>
              Login
            </Link>
            <Link className={styles.primaryLink} to={"/signup"}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
