import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingIn from '../components/pages/Authentication/SingIn';
import SingUp from '../components/pages/Authentication/SignUp';
import Home from '../components/pages/home/Home';
import IsAdminRoutes from './IsAdminRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SingIn />,
  },
  {
    path: '/signup',
    element: <SingUp />,
  },
  {
    
    children: [
      {
        
        loader: eventLoader,
      },
    ],
    
  }
]);



function Routers() {
  return <RouterProvider router={router} />;
}


export default Routers