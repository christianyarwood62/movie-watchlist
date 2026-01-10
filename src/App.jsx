import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AppLayout from "./UI/AppLayout";
import MovieList from "./pages/MovieList";
import Watchlist from "./pages/WatchList";
import LoginPage from "./pages/LoginPage";
import { createGlobalStyle } from "styled-components";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";

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

const GlobalStyle = createGlobalStyle`
  * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Inter", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  line-height: 1;
  font-weight: 400;
  color: var(--color-grey-600);
}

h2 {
  font-size: 4rem;
}

p {
  font-size: 2rem;
}

label, input, button {
  font-size: 1.6rem;
  background: none;
  border: none;
}

button {
  border-radius: 6px;
  cursor: pointer;
}

input {
  color: var(--color-grey-600);
}
`;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId="251462319482-j89rnbe1smt9aco9h8nu44qrnd5tcm7u.apps.googleusercontent.com">
          <GlobalStyle />
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
