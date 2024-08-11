import './App.css';
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { router } from "./router/Routes";
// import { addUser } from './features/usersSlice';
// import SingUp from './components/pages/Authentication/SignUp';
// import SingIn from './components/pages/Authentication/SingIn';
// import ForgetPassword from './components/pages/Authentication/ForgetPassword';
// import ConfirmpPassword from './components/pages/Authentication/ConfirmPassword';
// import ListAllUsers from './components/pages/userprofile/ListAllUsers';
// import Home from './components/pages/home/Home';
// import UserprofileShow from './components/pages/userprofile/Userprofile';
// import Logout from './components/pages/Authentication/Logout';
// import UnAuthToken from './components/pages/Authentication/UnAuthToken';
// import ServicePage from './components/pages/services/ServicePage';
// import RatingsReviewPage from './components/pages/ReviewRatings/RatingReviewPage';
// import Booking from './components/pages/Booking/Booking';
// import LocationPage from './components/pages/Locations/LocationPage';
// import useFetchData from './Networks/useFetchData';
// import PushedNotification from './components/pages/notification/PushedNotification';
// import NotFound from './components/subcomponents/NotFound';
// import ProvidersList from './components/pages/ServiceProvider/ProvidersList';
// import AddServicesPage from './components/pages/ServiceProvider/AddServicesPage';
// import Notification from './components/pages/notification/Notifications';

function App() {
  const [link, setLink] = useState("")
  const {isLoading, dataFetch} = useFetchData()
  const dispatch = useDispatch()
  
  const fetchProfile = async () => {
    const apiData = await dataFetch('userprofile')
    if (apiData?.success) {
      dispatch(addUser(apiData?.data[0]))
    }
  }

  useEffect(()=>{fetchProfile()}, []) 
  const currentUser = useSelector((state) => state.userProfileActions.user)
  
  return (
    <div className="App">
      <RouterProvider router={route} />
      // <BrowserRouter>
      //   <Routes>
      //     {!localStorage.getItem("access") ? <Route path="/" element={<SingIn />} /> : <Route path="/" element={<Home link={link} />} />}
      //     {
      //       currentUser.user_type.toLowerCase() === "superadmin" 
      //       && 
      //       <>
      //         <Route path="/allusers" element={<ListAllUsers />} />
      //         <Route path="/providers" element={<ProvidersList />} />
      //         <Route path="/servicespage" element={<ServicePage />} />
      //       </>          
      //     }
      //     {
      //       (currentUser.user_type.toLowerCase() === "superadmin" ||  currentUser.user_type.toLowerCase() === "serviceprovider")  
      //       && 
      //       <>
      //         <Route path="/addservice" element={<AddServicesPage />} />
      //       </> 
      //     }
          
      //     {
      //       (currentUser.user_type.toLowerCase() === "superadmin" ||  currentUser.user_type.toLowerCase() === "serviceprovider" || currentUser.user_type.toLowerCase() === "user")
      //       &&
      //       <>
      //         <Route path='/booking' element={<Booking />} />
      //         <Route path='/locations' element={<LocationPage />} />
      //         <Route path="/logout" element={<><Logout /></>} />
      //         <Route path="/reviewsrating" element={<RatingsReviewPage />} />
      //         <Route path="/authredirect" element={<><UnAuthToken /></>} />
      //         <Route path="/profile" element={<><UserprofileShow /></>} />
      //         <Route path="/offernotification" element={<PushedNotification />} />
      //         <Route path="/notification" element={<Notification />} />
      //       </>
      //     }
          
      //     {/* no auth urls */}
      //     {
      //       !currentUser.id &&
      //       <Route path="/signin" element={<SingIn />} />
      //     }
      //     <Route path="/signup" element={<SingUp />} />
      //     <Route path="/forget" element={<ForgetPassword />} />
      //     <Route path="/setpassword" element={<ConfirmpPassword />} />
      //     <Route path='*' element={<NotFound />} />
          
      //   </Routes>
      // </BrowserRouter>
      <noscript>
        <h1>!!TO RUN THIS WEBSITE PLEASE ENABLE THE JAVASCRIPT IN YOUR BROWSER!!</h1>
      </noscript>
    </div>
  );
}

export default App;
