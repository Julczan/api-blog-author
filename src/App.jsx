import Navbar from "./components/Navbar/Navbar";
import PostList from "./components/PostList/PostList";

function App({ domain }) {
  return (
    <>
      <Navbar />
      <PostList domain={domain} />
    </>
  );
}

export default App;
