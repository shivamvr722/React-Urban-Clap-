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
import AddService from "../services/AddServices"
import AddOrder from "../Booking/BookOrder"



const Home = ({ link }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, dataFetch } = useFetchData()
  const [cities, setCities] = useState("")

  const fetchProfile = async () => {
    const apiData = await dataFetch('userprofile')
    if (apiData?.success) {
      dispatch(addUser(apiData?.data[0]))
    } else if (!apiData?.success){
      navigate("/authredirect") 
    }
  }

  const fetchStates = async () => {
    const apiData = await dataFetch('state')
    if (apiData?.success) {
      console.log("success: ", apiData?.data);
      dispatch(addState(apiData?.data))
    }
  }


  const fetchServices = async () => {
    const apiData = await dataFetch("service")
    if (apiData?.success) {
      dispatch(addService(apiData?.data))
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }

  const fetchSubServices = async () => {
    const apiData = await dataFetch("subservice")
    if (apiData?.success) {
      dispatch(addSubService(apiData?.data))
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }

  const fetchCities = async () => {
    const apiData = await dataFetch('city')
    if (apiData?.success) {
      setCities(apiData?.data)
    } else if (!apiData?.success){
      navigate("/authredirect") 
    }
  }
 
  useEffect(
    () => { fetchProfile(); fetchStates(); fetchServices(); fetchSubServices(); fetchCities() } , 
  [])

  const userData = useSelector((state) => state.userProfileActions.user); // can send it to navbar letter to make diff betwin roles

  return (
    <>
      <NavigationBar />
      <div className="maincontainer">
        <DSCards />
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
