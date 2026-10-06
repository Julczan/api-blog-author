import App from "./App";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import Comment from "./components/CommentList/Comment";
import ErrorPage from "./components/ErrorPage";
import Post from "./components/Post/Post";
import PostForm from "./components/Post/PostForm";

const domain = "https://api-blog-backend-production.up.railway.app";

const routes = [
  {
    path: "/",
    element: <App domain={domain} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/posts/add",
    element: <PostForm domain={domain} />,
  },
  {
    path: "/signup",
    element: <SignUpForm domain={domain} />,
  },
  {
    path: "/login",
    element: <LoginForm domain={domain} />,
  },
  {
    path: "/posts/:postId",
    element: <Post domain={domain} />,
  },
  {
    path: "/posts/:postId/comments/:commentId",
    element: <Comment domain={domain} />,
  },
];

export default routes;
