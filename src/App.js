import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Events from "./pages/Events";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import EventsRootLayout from "./pages/EventsRoot";
import EventDetailPage from "./pages/EventDetail";
import EditEventPage from "./pages/EditEvent";
import NewEventPage from "./pages/NewEvent";
import Notification from "./components/Notification";
import AuthenticationPage from "./pages/Authentication";
import { fetchEventsData } from "./store/events-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notificationActions } from "./store/notification-slice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/events",
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <Events /> },
          { path: "/events/:id", element: <EventDetailPage /> },
          { path: "/events/new", element: <NewEventPage /> },
          { path: "/events/:id/edit", element: <EditEventPage /> },
        ],
      },
      { path: "/auth", element: <AuthenticationPage /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.notification);

  useEffect(() => {
    dispatch(fetchEventsData());
  }, [dispatch]);

  setTimeout(() => {
    dispatch(notificationActions.hideNotification());
  }, 1500);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
