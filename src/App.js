import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Events from "./pages/Events";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/events", element: <Events /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
