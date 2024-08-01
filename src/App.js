// import Navbar from './components/subcomponents/navbar/Navbar';
import SingUp from './components/pages/Authentication/SignUp';
import SingIn from './components/pages/Authentication/SingIn';
import ForgetPassword from './components/pages/Authentication/ForgetPassword';
import ConfirmpPassword from './components/pages/Authentication/ConfirmPassword';
import ListAllUsers from './components/pages/userprofile/ListAllUsers';
import Home from './components/pages/home/Home';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import './App.css';
import UserprofileShow from './components/pages/userprofile/Userprofile';
import Logout from './components/pages/Authentication/Logout';
import UnAuthToken from './components/pages/Authentication/UnAuthToken';
import Services from './components/pages/services/Services';
import SubServices from './components/pages/services/SubServices';
import AddService from './components/pages/services/AddServices';
import ServicePage from './components/pages/services/ServicePage';
import RatingsReviewPage from './components/pages/ReviewRatings/RatingReviewPage';
import ShowServiceProvider from './components/pages/ServiceProvider/ShowServiceProvder';
import Booking from './components/pages/Booking/Booking';
import LocationPage from './components/pages/Locations/LocationPage';
import { addUser } from './features/usersSlice';
import useFetchData from './Networks/useFetchData';
import { useDispatch, useSelector } from 'react-redux';
import PushedNotification from './components/pages/notification/PushedNotification';
import NotFound from './components/subcomponents/NotFound';
import ProvidersList from './components/pages/ServiceProvider/ProvidersList';
import AddProviderServices from './components/pages/ServiceProvider/AddServiceProvider';
import AddServicesPage from './components/pages/ServiceProvider/AddServicesPage';

// import ViewReviews from './components/pages/ReviewRatings/Review';
// import ViewsRatings from './components/pages/ReviewRatings/Ratings';
// require('dotenv').config()

function App() {
  const [link, setLink] = useState("")
  const [user,  setUser] = useState()
  const [orderCount, setOrderCount] = useState(0)
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
      <BrowserRouter>
        <Routes>
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
            </>
          }
          
          {/* no auth urls */}
          <Route path="/signup" element={<SingUp />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/setpassword" element={<ConfirmpPassword />} />
          <Route path='*' element={<NotFound />} />
          
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/subservices" element={<SubServices />} /> */}
          {/* <Route path="/addservices" element={<AddService />} /> */}
          
          
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
