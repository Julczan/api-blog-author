import { Link, useNavigate } from "react-router";
import { signOut } from "../../api/signOut";

function Navbar() {
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("Authorization");

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  if (localStorageToken) {
    return (
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/posts/add"}>Add post</Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </nav>
    );
  }

  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/signup"}>Sign up</Link>
      <Link to={"/login"}>Login</Link>
    </nav>
  );
}

export default Navbar;
