// import Navbar from './components/subcomponents/navbar/Navbar';
import SingUp from './components/pages/Authentication/SignUp';
import SingIn from './components/pages/Authentication/SingIn';
import ForgetPassword from './components/pages/Authentication/ForgetPassword';
import ConfirmpPassword from './components/pages/Authentication/ConfirmPassword';
import ListAllUsers from './components/pages/userprofile/ListAllUsers';
import Home from './components/pages/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
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
// import ViewReviews from './components/pages/ReviewRatings/Review';
// import ViewsRatings from './components/pages/ReviewRatings/Ratings';
// require('dotenv').config()

function App() {
  const [link, setLink] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!localStorage.getItem("access") ? <Route path="/" element={<SingIn />} /> : <Route path="/" element={<Home link={link} />} />}
          {/* <Route path="/" element={<SingIn />} /> */}
          <Route path="/signup" element={<SingUp />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/setpassword" element={<ConfirmpPassword />} />
          <Route path="/profile" element={<><UserprofileShow /></>} />
          <Route path="/logout" element={<><Logout /></>} />
          <Route path="/authredirect" element={<><UnAuthToken /></>} />
          <Route path="/allusers" element={<ListAllUsers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/subservices" element={<SubServices />} />
          <Route path="/addservices" element={<AddService />} />
          <Route path="/servicespage" element={<ServicePage />} />
          <Route path="/reviewsrating" element={<RatingsReviewPage />} />
          <Route path="/providers" element={<ShowServiceProvider />} />
          {/* <Route path="/reviews" element={<ViewReviews />} />
          <Route path="/ratings" element={<ViewsRatings />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
