import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import MovieList from "./pages/MovieList";
import Watchlist from "./pages/WatchList";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
