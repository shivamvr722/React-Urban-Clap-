import { useEffect, useState } from "react"
import "./services.css"
import axios from "axios"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"

const Services = () => {
  const [services, setServices] = useState("")
  const URL = "http://127.0.0.1:8000/urban-company/service/"
  const servicesFetch = async () => {
    try{
      const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
      setServices(response.data)
    } catch (error) {
      console.log(error.data)
    }
  }

  useEffect(()=>{
    servicesFetch()
  }, [])

  
    let serviceMapped = ""
    if(services){
      serviceMapped = services?.map((obj, i)=>{
        return <div key={obj.service_type} className="servicecategory" onClick={()=>{ console.log(obj.id) }}>{obj.service_type}</div>
      })

    return(
      <>
      <div className="servicesCatContainer">
        <Heading1 name="Select Services" />
        {serviceMapped}
      </div>
      </>
    )
  }
}


export default Services