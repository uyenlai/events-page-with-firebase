import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Events from "./pages/Events";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import EventDetailPage from "./pages/EventDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/events", element: <Events /> },
      { path: "/events/:id", element: <EventDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
