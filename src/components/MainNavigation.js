import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import app from "../util/firebase";
import { useState } from "react";

const auth = getAuth(app);

function MainNavigation() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
        </ul>
        {user && (
          <div>
            <Link to="/auth?mode=login">
              <button onClick={handleLogout}>Logout</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default MainNavigation;
