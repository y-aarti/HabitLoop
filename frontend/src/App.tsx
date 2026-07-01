import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import RootLayout from './pages/RootLayout';
import Landing from './pages/Landing';
import Details from './pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // Wraps our pages
    errorElement: <NotFound />, // Catches any 404s or errors
    children: [
      { path: '/', element: <Landing /> },
      { path: '/details', element: <Details /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
