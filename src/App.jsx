import "./App.css";
import PostList from "./PostList/PostList";

function App({ domain }) {
  return (
    <>
      <PostList domain={domain} />
    </>
  );
}

export default App;
