import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './View/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Movies from './View/Movies/Movies';
import TVShows from './View/TV Shows/tvShows';
import Series from './View/Series/Series';
import Error from './View/404/404';
import { Toaster } from 'react-hot-toast';
import MovieDetails from './View/movieDetails/MovieDetails'

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/movies',
    element: <Movies />,
  },
  {
    path: '/series',
    element: <Series />,
  },
  {
    path: '/tv-shows',
    element: <TVShows />,
  },
  {
    path: '/movie-info/:title',
    element: <MovieDetails />,
  },
  {
    path: "*",
    element: <Error />
  }
]);

root.render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
