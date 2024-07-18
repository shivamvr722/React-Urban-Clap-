import axios from "axios"
import { useState, useEffect } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"

const SubServices = () => {
  const [subServices, setSubServices] = useState("")
  const URL = "http://127.0.0.1:8000/urban-company/subservice/"
  const subServicesFetch = async () => {
    try{
      const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
      setSubServices(response.data)
    } catch (error) {
      console.log(error.data)
    }
  }

  useEffect(()=>{
    subServicesFetch()
  }, [])

  let subServiceMapped = ""
  if(subServices){
    subServiceMapped = subServices?.map((obj, i)=>{
      return <div key={obj.sub_service} className="servicecategory" onClick={()=>{ console.log(obj.id) }}>{obj.sub_service}</div>
    })

    return(
      <>
      <div className="servicesCatContainer">
        <Heading1 name="Select Services" />
        {subServiceMapped}
      </div>
      </>
    )
  }
}

export default SubServices