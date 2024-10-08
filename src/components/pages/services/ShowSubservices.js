import { useState } from "react"
import "./services.css"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { useSelector } from "react-redux"


const ShowSubServices = () => {
  const [subServicesId, setSubServicesId] = useState("2")
  
  let serviceMapped = ""
  let subServiceMapped = ""
  const servicesData = useSelector(state => state.servicesActions.services )
  const subservicesData = useSelector(state => state.subServiceAction.subservices )

  if(servicesData?.length > 0){   
    serviceMapped = servicesData?.map((obj, i)=>{
      return <option key={obj.id} value={obj.id}>{obj.service_type}</option>
    })
  }

  if(subservicesData?.length > 0){ 
    const filteredServices = subservicesData.filter((subservice, i )=> subServicesId === `${subservice.service_type}`)
    subServiceMapped = filteredServices?.map((obj, i)=>{
      return <div key={obj.id} className="servicecategory" onClick={()=>{ console.log(obj.id) }}>{obj.sub_service}</div> 
    })

    return(
      <div className="servicesCont">
        <div className="servicesCatContainer">
          <Heading1 name="Sub Services" />
          <select name="services" onChange={(e) => setSubServicesId(e.target.value)} className="selectbox">
            {serviceMapped}
          </select>
          {subServiceMapped}
        </div>
      </div>
    )
  }
}


export default ShowSubServices