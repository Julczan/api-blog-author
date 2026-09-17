import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { signUp } from "../../api/signUp";

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
    <>
      {mutation.isPending && <p>Loading...</p>}
      {mutation.error &&
        mutation.error.map((err) => <p key={err.msg}>{err.msg}</p>)}
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="coolcoder99"
            autoComplete="no"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            autoComplete="no"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="no"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="no"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>

      <p className="form-footer">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
}

export default SignUpForm;
