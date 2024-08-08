import "./home.css"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import Footer from "../../subcomponents/footers/footer"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Services from "../services/Services"
import useFetchData from "../../../Networks/useFetchData"
import DSCards from "../../subcomponents/cards/DSCards"
import { addState } from "../../../features/stateSlice"
import { addService } from "../../../features/services"
import { addSubService } from "../../../features/subServices"
import TotalUserPieChart from "../../subcomponents/charts/PieChar"
import { useNavigate } from "react-router-dom"




const Home = ({ link }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, dataFetch } = useFetchData();
  const [usersCount, setUsersCount] = useState(0)
  const [providersCount, setProvidersCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [pendingBookCount, setPendingBookCount] = useState(0);
  const [ordersCounts, setOrderCounts] = useState({});
  const [subServiceCount, setSubServiceCount] = useState(0);
  const [search, setSearch] = useState("");

  const currentUser = useSelector((state) => state.userProfileActions.user)

  // api data fetching functions
  const fetchUsersCount = async () => {
    if (currentUser.user_type.toLowerCase() === "superadmin" || currentUser.user_type.toLowerCase() === "serviceprovider") {
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
    // if(currentUser.user_type.toLowerCase() === "superadmin" || currentUser.user_type.toLowerCase() === "serviceprovider"){
    const apiData = await dataFetch('bookings');

    const apiDataSPending = await dataFetch('bookings/?service_status__iexact=pending');
    const apiDataSAccepted = await dataFetch('bookings/?service_status__iexact=accepted');
    const apiDataSComplted = await dataFetch('bookings/?service_status__iexact=completed');
    const apiDataSCancelled = await dataFetch('bookings/?service_status__iexact=cancelled');
    const apiDataSRejected = await dataFetch('bookings/?service_status__iexact=rejected');
    const apiDataSProgress = await dataFetch('bookings/?service_status__iexact=inprogress');
    // if([apiDataSPending.status, apiDataSAccepted.status, apiDataSComplted.status, apiDataSCancelled.status, apiDataSRejected.status,  apiDataSCancelled.status, apiDataSProgress.status])
    if (apiDataSPending.status === 401|| apiDataSAccepted.status  === 401 || apiDataSComplted.status === 401 || apiDataSCancelled.status === 401  || apiDataSRejected.status === 401 || apiDataSProgress.status === 401) {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      navigate("/")
      return false
    } else {
      const orderCountsData = { accepted: apiDataSAccepted?.data?.count, pending: apiDataSPending?.data?.count, completed: apiDataSComplted?.data?.count, cancelled: apiDataSCancelled?.data?.count, rejected: apiDataSRejected?.data?.count, inprogress: apiDataSProgress?.data?.count }
      setOrderCounts(orderCountsData)
      setBookingsCount(apiData?.data?.count)
      setPendingBookCount(apiDataSPending?.data?.count)
    }

    // }
  }

  const fetchStates = async () => {
    const apiData = await dataFetch('state')
    if (apiData?.success) {
      dispatch(addState(apiData?.data))
    }
  }

  const fetchServices = async () => {
    const URL = `service/?service_type__icontains=${search}`
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      setServicesCount(apiData?.data?.length)
      if (!apiData?.data?.length) {
        dispatch(addService(false))
      } else {
        dispatch(addService(apiData?.data))
      }
    } else if (!apiData?.success) {
      console.log(apiData.error);
    }
  }

  const fetchSubServices = async () => {
    const apiData = await dataFetch("subservice")
    if (apiData?.success) {
      dispatch(addSubService(apiData?.data))
      setSubServiceCount(apiData?.data?.length)
    } else if (!apiData?.success) {
      console.log(apiData.error);
    }
  }

  // fetching function called
  useEffect(
    () => {
      fetchUsersCount();
      fetchStates();
      fetchSubServices();
      fetchBookings();
    },
    [currentUser]);

  // for seach query
  useEffect(
    () => { fetchServices() },
    [search]);


  return (
    <>
      <NavigationBar />
      <div className="maincontainer">
        <p className="text-[28px] font-[900] text-left ml-5 mt-5">Welcome, {currentUser.first_name} {currentUser.last_name}</p>
        <DSCards usersCount={usersCount} providersCount={providersCount} bookingsCount={bookingsCount} servicesCount={servicesCount} pendingBookCount={pendingBookCount} dataCounts={ordersCounts} subServiceCount={subServiceCount} />
        {(currentUser.user_type === "superadmin" || currentUser.user_type === "serviceprovider") && <TotalUserPieChart dataCounts={ordersCounts} />}
        <h2 className="text-[28px] font-[900] mt-9">Book A Service</h2>
        <input type="text" id="search" placeholder="Search here..." onChange={(e) => setSearch(e.target.value)} value={search} />
        <Services />
        <Footer />
      </div>

    </>
  )
}

export default Home

