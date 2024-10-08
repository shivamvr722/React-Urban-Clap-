import './App.css';
import { BrowserRouter, Routes, Route, createBrowserRoute, createRouteFromElement } from "react-router-dom";
import { useEffect, useState } from 'react';
import { addUser } from './features/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import SingUp from './components/pages/Authentication/SignUp';
import SingIn from './components/pages/Authentication/SingIn';
import ForgetPassword from './components/pages/Authentication/ForgetPassword';
import ConfirmpPassword from './components/pages/Authentication/ConfirmPassword';
import ListAllUsers from './components/pages/userprofile/ListAllUsers';
import Home from './components/pages/home/Home';
import UserprofileShow from './components/pages/userprofile/Userprofile';
import Logout from './components/pages/Authentication/Logout';
import UnAuthToken from './components/pages/Authentication/UnAuthToken';
import ServicePage from './components/pages/services/ServicePage';
import RatingsReviewPage from './components/pages/ReviewRatings/RatingReviewPage';
import Booking from './components/pages/Booking/Booking';
import LocationPage from './components/pages/Locations/LocationPage';
import useFetchData from './Networks/useFetchData';
import PushedNotification from './components/pages/notification/PushedNotification';
import NotFound from './components/subcomponents/NotFound';
import ProvidersList from './components/pages/ServiceProvider/ProvidersList';
import AddServicesPage from './components/pages/ServiceProvider/AddServicesPage';
import Notification from './components/pages/notification/Notifications';import { Route } from "react-router"


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
