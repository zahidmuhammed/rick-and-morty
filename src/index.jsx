import React from "react";
import "./index.css";
import Home from "./App";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import ListCharacters from "./pages/characters";
import ListEpisodes from "./pages/episodes";
import ViewCharacter from "./pages/view-character";
import ViewEpisode from "./pages/view-episode";
import ErrorPage from "./pages/error-page";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/characters",
      element: <ListCharacters />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/characters/:id",
      element: <ViewCharacter />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/episodes",
      element: <ListEpisodes />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/episodes/:id",
      element: <ViewEpisode />,
      errorElement: <ErrorPage />,
    },
  ],
  { basename: "/rick-and-morty" }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
