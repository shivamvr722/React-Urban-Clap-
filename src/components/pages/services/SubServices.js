import axios from "axios"
import { useState, useEffect } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import useFetchData from "../../../Networks/useFetchData"

const SubServices = () => {
  const [subServices, setSubServices] = useState()
  const { isLoading, dataFetch } = useFetchData()

  const fetchData = async () => {
    const apiData = await dataFetch("subservice")
    if (apiData?.success) {
      setSubServices(apiData?.data)
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }
 
  useEffect(
    () => { fetchData() },
  [])


  let subServiceMapped = null

  if(subServices){
    // const subServices = apiData;
    subServiceMapped = subServices?.map((obj, i)=>{
      return <div key={obj.sub_service} className="servicecategory" onClick={()=>{ console.log(obj.id) }}>{obj.sub_service}</div>
    })
  }

  return(
    <div className="servicesCatContainer">
      <Heading1 name="Sub Service" />
      {subServiceMapped}
    </div>
  )
}


export default SubServices