import { Link, useSearchParams } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <>
      <form className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new account"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Signup"}</button>
        </div>
        {isLogin && (
          <Link to="?mode=signup">
            Don't have an account yet? Sign up here!
          </Link>
        )}
      </form>
    </>
  );
}

export default AuthForm;
