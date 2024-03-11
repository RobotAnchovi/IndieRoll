import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage';
import HomePage from '../components/HomePage';
import UserProfilePage from '../components/UserProfilePage';
import ContentPage from '../components/ContentPage';
import SubmitFilmPage from '../components/SubmitFilmPage';
import WatchlistPage from '../components/WatchlistPage';
import GenrePage from '../components/GenrePage';
import EditFilm from '../components/EditFilm';
import UpdateUserProfileForm from '../components/UpdateUserProfileForm';
import VideoPlayerWrapper from '../components/VideoPlayerWrapper';
import AboutPage from '../components/About/About';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'content',
        element: <HomePage />,
      },
      {
        path: 'content/all/:id',
        element: <ContentPage />,
      },
      {
        path: 'content/all/:id/play',
        element: <VideoPlayerWrapper />,
      },
      {
        path: '/content/:genreName',
        element: <GenrePage />,
      },
      {
        path: 'profile',
        element: <UserProfilePage />,
      },
      {
        path: 'profile/update',
        element: <UpdateUserProfileForm />,
      },
      {
        path: 'submit-film',
        element: <SubmitFilmPage />,
      },
      {
        path: 'edit-film/:id',
        element: <EditFilm />,
      },
      {
        path: 'login',
        element: <LoginFormPage />,
      },
      {
        path: 'signup',
        element: <SignupFormPage />,
      },
      {
        path: 'watchlist',
        element: <WatchlistPage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
]);
