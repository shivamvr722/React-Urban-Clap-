import { useEffect, useState } from "react"
import "./services.css"
import axios from "axios"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { useDispatch, useSelector } from "react-redux"
import { addSubService } from "../../../features/subServices";


const ShowSubServices = () => {
  const [subServicesId, setSubServicesId] = useState("3")
  const dispatch = useDispatch()
  const URL = "http://127.0.0.1:8000/urban-company/subservice/"

  const servicesFetch = async () => {
    try{
      const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
      console.log(response.data);
      dispatch(addSubService(response.data))
    } catch (error) {
      console.log(error.data)
    }
  }

  useEffect(()=>{
    servicesFetch()
  }, [])

  
  let serviceMapped = ""
  let subServiceMapped = ""
  const servicesData = useSelector(state => state.servicesActions.services )
  const subservicesData = useSelector(state => state.subServiceAction.subservices )

  if(subservicesData.length > 0){   
    serviceMapped = servicesData?.map((obj, i)=>{
      return <option key={obj.id} value={obj.id}>{obj.service_type}</option>
    })
  }
  
  
  if(subservicesData.length > 0){ 
    const filteredServices = subservicesData.filter((subservice, i )=> subServicesId === `${subservice.service_type}`)
    subServiceMapped = filteredServices?.map((obj, i)=>{
      return <div key={obj.id} className="servicecategory" onClick={()=>{ console.log(obj.id) }}>{obj.sub_service}</div> 
    })

    return(
      <div className="servicesCont">
        <div className="servicesCatContainer">
          <Heading1 name="Sub Services" />
          <select name="services" onChange={(e) => setSubServicesId(e.target.value)} >
            {serviceMapped}
          </select>
          {subServiceMapped}
        </div>
      </div>
    )
  }
}


export default ShowSubServices