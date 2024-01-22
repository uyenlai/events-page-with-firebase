import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Events from "./pages/Events";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import EventsRootLayout from "./pages/EventsRoot";
import EventDetailPage from "./pages/EventDetail";
import EditEventPage from "./pages/EditEvent";
import NewEventPage from "./pages/NewEvent";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
