import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import HomePage from "../components/HomePage";
import UserProfilePage from "../components/UserProfilePage";
import SubmitFilmPage from "../components/SubmitFilmPage";
import WatchlistPage from "../components/WatchlistPage";
import GenrePage from "../components/GenrePage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "content",
        element: <HomePage />,
      },
      {
        path: "/content/:genreName",
        element: <GenrePage />,
      },
      {
        path: "profile",
        element: <UserProfilePage />,
      },
     {
        path:"submit-film",
        element: <SubmitFilmPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "watchlist",
        element: <WatchlistPage />,
      }
    ],
  },
]);
