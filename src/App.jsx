import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import MovieList from "./pages/MovieList";
import Watchlist from "./pages/WatchList";
import { loader as moviesLoader } from "./pages/MovieList";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <MovieList />,
        loader: moviesLoader,
      },
      {
        path: "/watch-list",
        element: <Watchlist />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
