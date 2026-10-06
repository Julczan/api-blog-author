import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { signUp } from "../../api/signUp";
import styles from "./SignUpForm.module.css";

function SignUpForm({ domain }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation({
    mutationKey: ["signup", domain],
    mutationFn: (domain, formdata) => signUp(domain, formdata),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = { username, email, password, confirmPassword };
    mutation.mutate({ domain, formdata });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create an Account</h2>

      {mutation.isPending && (
        <div className={styles.loadingMsg}>Loading...</div>
      )}

      {mutation.error &&
        mutation.error.map((err) => (
          <div key={err.msg} className={styles.errorMsg}>
            {err.msg}
          </div>
        ))}

      <form className={styles.form} name="form" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="coolcoder99"
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
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
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="off"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>

      <p className={styles.footer}>
        Already have an account?{" "}
        <Link className={styles.link} to="/login">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignUpForm;
