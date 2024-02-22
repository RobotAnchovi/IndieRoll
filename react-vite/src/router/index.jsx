import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import HomePage from "../components/HomePage";
import UserProfilePage from "../components/UserProfilePage";
import Layout from "./Layout";
import SubmitFilmPage from "../components/SubmitFilmPage";

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
    ],
  },
]);
