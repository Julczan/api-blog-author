import App from "./App";
import LoginForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import ErrorPage from "./components/ErrorPage";

const domain = "http://localhost:3000";

const routes = [
  {
    path: "/",
    element: <App domain={domain} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpForm domain={domain} />,
  },
  {
    path: "/login",
    element: <LoginForm domain={domain} />,
  },
];

export default routes;
