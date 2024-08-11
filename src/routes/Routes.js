import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SingIn from '../components/pages/Authentication/SingIn';
import SingUp from '../components/pages/Authentication/SignUp';
import Home from '../components/pages/home/Home';
import IsAdminRoutes from './IsAdminRoutes';

import { Route } from "react-router"
import {createBrowserRoute, createRouteFromElement} from "react-router-dom"

const routerDefinition = createRouteFromElement(
    <Route>
        {!localStorage.getItem("access") ? <Route path="/" element={<SingIn />} /> : <Route path="/" element={<Home link={link} />} />}
        {
            currentUser.user_type.toLowerCase() === "superadmin" 
            && 
            <>
            <Route path="/allusers" element={<ListAllUsers />} />
            <Route path="/providers" element={<ProvidersList />} />
            <Route path="/servicespage" element={<ServicePage />} />
            </>          
        }
        {
            (currentUser.user_type.toLowerCase() === "superadmin" ||  currentUser.user_type.toLowerCase() === "serviceprovider")  
            && 
            <>
            <Route path="/addservice" element={<AddServicesPage />} />
            </> 
        }
        
        {
            (currentUser.user_type.toLowerCase() === "superadmin" ||  currentUser.user_type.toLowerCase() === "serviceprovider" || currentUser.user_type.toLowerCase() === "user")
            &&
            <>
            <Route path='/booking' element={<Booking />} />
            <Route path='/locations' element={<LocationPage />} />
            <Route path="/logout" element={<><Logout /></>} />
            <Route path="/reviewsrating" element={<RatingsReviewPage />} />
            <Route path="/authredirect" element={<><UnAuthToken /></>} />
            <Route path="/profile" element={<><UserprofileShow /></>} />
            <Route path="/offernotification" element={<PushedNotification />} />
            <Route path="/notification" element={<Notification />} />
            </>
        }
        
        {/* no auth urls */}
        {
            !currentUser.id &&
            <Route path="/signin" element={<SingIn />} />
        }
        <Route path="/signup" element={<SingUp />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/setpassword" element={<ConfirmpPassword />} />
        <Route path='*' element={<NotFound />} />
    </Route>
)

const router = createBrowserRoute(routerDefinition)

export default router
