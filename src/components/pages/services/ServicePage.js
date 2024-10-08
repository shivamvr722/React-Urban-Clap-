import Services from "./Services"
import AddService from "./AddServices"
import AddSubService from "./AddSubServices"
import ShowSubServices from "./ShowSubservices"
import AddState from "../Locations/AddState"
import useFetchData from "../../../Networks/useFetchData"
import AddCity from "../Locations/AddCities"
import ShowStates from "../Locations/ShowCityStates"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import SubServices from "./SubServices"
import AddProviderServices from "../ServiceProvider/AddServiceProvider"

const ServicePage = () => {  
  const data = useFetchData()
  return (
    <div>
      <NavigationBar />
      <div className="addServiceContainer">
      </div>
        <AddService />
        <AddSubService />
        <AddProviderServices />
        <ShowSubServices />
      <div className="showServicesContainer">
        <Services />
      </div>
    </div>
  )
}


export default ServicePage