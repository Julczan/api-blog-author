import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/login";

function LoginForm({ domain }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["login", domain],
    mutationFn: (domain, formdata) => login(domain, formdata),
    onSuccess: (data) => {
      saveTokenToLocalStorage(data.token, data.user.username);
      navigate("/");
    },
  });

  const saveTokenToLocalStorage = (token, username) => {
    localStorage.setItem("Authorization", `bearer ${token}`);
    localStorage.setItem("User", username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = { username, password };
    mutation.mutate({ domain, formdata });
  };

  return (
    <>
      {mutation.isPending && <p>Loading...</p>}
      {mutation.error && mutation.error.msg}
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="coolcoder99"
            type="text"
            autoComplete="no"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            autoComplete="no"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Log In
        </button>
      </form>

      <p className="form-footer">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </>
  );
}

export default LoginForm;
