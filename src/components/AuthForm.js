import { Link, useNavigate, useSearchParams } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { addUser } from "../store/auth-actions";
import { notificationActions } from "../store/notification-slice";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../util/firebase";

const auth = getAuth(app);

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!isLogin) {
      //SIGN_UP
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        dispatch(addUser(email, password));
        navigate("/");
      } catch (error) {
        dispatch(
          notificationActions.showNotification({
            status: "error",
            title: "Signup failed!",
            message: error.message,
          })
        );
      }
    } else {
      //LOG_IN
      try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(
          notificationActions.showNotification({
            status: "success",
            title: "Logged In!",
            message: "Log in successfully",
          })
        );
        navigate("/");
      } catch (error) {
        dispatch(
          notificationActions.showNotification({
            status: "error",
            title: "Login failed!",
            message: error.message,
          })
        );
      }
    }
    e.target.reset();
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
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
