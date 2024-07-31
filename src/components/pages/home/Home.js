import "./home.css"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import Footer from "../../subcomponents/footers/footer"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../../../features/usersSlice"
import { useNavigate } from "react-router-dom"
import Services from "../services/Services"
import useFetchData from "../../../Networks/useFetchData"
import DSCards from "../../subcomponents/cards/DSCards"
import { addState } from "../../../features/stateSlice"
import { addService } from "../../../features/services"
import { addSubService } from "../../../features/subServices"




const Home = ({ link }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, dataFetch } = useFetchData();
  const [cities, setCities] = useState("")
  const [usersCount, setUsersCount] = useState(0)
  const [providersCount, setProvidersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0)
  const [pendingBookCount, setPendingBookCount] = useState(0)
  const [subServiceCount, setSubServiceCount] = useState(0)
  

  const currentUser = useSelector((state) => state.userProfileActions.user)

  
  const fetchUsersCount = async () => {
    if(currentUser.user_type.toLowerCase() === "superadmin"){
      const apiData = await dataFetch('userprofiles')
      const apiData2S = await dataFetch('userprofiles/?p=1&user_type__iexact=ServiceProvider')
      if (apiData2S?.success) {
        setProvidersCount(apiData2S?.data?.count)
      } 
      if (apiData?.success) {
        setUsersCount(apiData?.data?.count)
      }
    }
  }
  
  const fetchBookings = async () => {
    if(currentUser.user_type.toLowerCase() === "superadmin" || currentUser.user_type.toLowerCase() === "serviceprovider"){
      const apiData = await dataFetch('bookings')
      if (apiData?.success) {
        let bcount = 0
        if(apiData?.l)
        console.log(apiData);
        apiData?.data?.forEach((obj, i) => {
          if(obj.service_status.toLowerCase() === "pending"){
            bcount++;
          }
        })
        setPendingBookCount(bcount)
        setBookingsCount(apiData?.data?.length)
      }
    }
  }

  const fetchStates = async () => {
    const apiData = await dataFetch('state')
    if (apiData?.success) {
      dispatch(addState(apiData?.data))
    }
  }


  const fetchServices = async () => {
    const apiData = await dataFetch("service")
    if (apiData?.success) {
      setServicesCount(apiData?.data?.length)
      dispatch(addService(apiData?.data))
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }

  const fetchSubServices = async () => {
    const apiData = await dataFetch("subservice")
    if (apiData?.success) {
      dispatch(addSubService(apiData?.data))
      setSubServiceCount(apiData?.data?.length)
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }

  const fetchCities = async () => {
    const apiData = await dataFetch('city')
    if (apiData?.success) {
      setCities(apiData?.data)
    }
  }
 
  useEffect(
    () => { fetchUsersCount(); fetchStates(); fetchServices(); fetchSubServices(); fetchCities(); fetchBookings() } , 
  [])
  // fetchProfile();

  const userData = useSelector((state) => state.userProfileActions.user); // can send it to navbar letter to make diff betwin roles

  return (
    <>
      <NavigationBar />
      <div className="maincontainer">
        <DSCards usersCount={usersCount} providersCount={providersCount} bookingsCount={bookingsCount} servicesCount={servicesCount} pendingBookCount={pendingBookCount} subServiceCount={subServiceCount}/>
        <Services />
      </div>
      <Footer />
    </>
  )
}

export default Home

// <div className="serviceCat">
//               <Services />
//             </div>
//             <div className="image1">
//               <img src={servicesImage} width={900} height={900} />
//             </div>

// <div className="maincontainer">
//         <div className="servicesContainer1">
//         <div className="max-w-sm rounded overflow-hidden shadow-lg">
//           <img className="w-full" src={servicesImage} alt="Sunset in the mountains" />
//           <div className="px-6 py-4">
//             <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
//             <p className="text-gray-700 text-base">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
//             </p>
//           </div>
//           <div className="px-6 pt-4 pb-2">
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
//           </div>
//         </div>
//         </div>
//       </div>
