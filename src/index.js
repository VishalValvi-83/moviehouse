import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './View/Home';
import { RouterProvider,  createBrowserRouter } from 'react-router-dom';
import Movies from './View/Movies/Movies';
import TVShows from './View/TV Shows/tvShows';
import Series from './View/Series/Series';

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
]);

root.render(
  <RouterProvider router={router} />
);
