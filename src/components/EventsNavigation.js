import { NavLink } from "react-router-dom";
import classes from "./EventsNavigation.module.css";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import app from "../util/firebase";
import { useState } from "react";

const auth = getAuth(app);

function EventsNavigation() {
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Events
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                New Event
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
