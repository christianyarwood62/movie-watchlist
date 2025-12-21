import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import MovieList from "./pages/MovieList";
import Watchlist from "./pages/WatchList";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MovieList />,
      },
      {
        path: "/watch-list",
        element: <Watchlist />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
