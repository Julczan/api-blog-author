import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../../api/login";
import { useMutation } from "@tanstack/react-query";
import styles from "./LoginForm.module.css";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome Back</h2>

      {mutation.isPending && (
        <div className={styles.loadingMsg}>Loading...</div>
      )}
      {mutation.error && (
        <div className={styles.errorMsg}>{mutation.error.msg}</div>
      )}

      <form className={styles.form} name="form" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="coolcoder99"
            type="text"
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type="password"
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>

      <p className={styles.footer}>
        Don't have an account?{" "}
        <Link className={styles.link} to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
