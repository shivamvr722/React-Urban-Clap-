import Services from "./Services"
import AddService from "./AddServices"
import AddSubService from "./AddSubServices"
import ShowSubServices from "./ShowSubservices"




const ServicePage = () => {  
  return (
    <div>
      <div className="addServiceContainer">
        <AddService />
        <AddSubService />
      </div>
      <div className="showServicesContainer">
        <Services />
        <ShowSubServices />
        
      </div>
    </div>
  )
}


export default ServicePage