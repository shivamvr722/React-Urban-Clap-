import { useEffect, useState } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import "./location.css"
import useFetchData from "../../../Networks/useFetchData"
import axios from "axios"
import { useSelector } from "react-redux"



const ShowCities = () => {
  const { isLoading, dataFetch } = useFetchData();
  const [cities, setCities] = useState("")
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const uType = currentUser.user_type.toLowerCase()

  const handleActivation = async (id, status) => {
    const URL = `http://127.0.0.1:8000/urban-company/city/${id}/`
    try{
      const putValue = {"city_status": status}
      const resposne = await axios.patch(URL, putValue, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      const data = await resposne.data
      setCities(cities.map((obj, i)=> obj?.id === id ? {...obj, city_status: data.city_status} : obj ))
    } catch (error) {
      console.log(error.resposne.data)
    }    
  }

  
  const fetchCities = async () => {
    const apiData = await dataFetch('city')
    if (apiData?.success) {
      setCities(apiData?.data)
    }
  }

  useEffect(
    () => { fetchCities() },
  [])
  
  
  if(cities?.length > 0) {
    const citiesMap = cities?.map((obj, i) =>{
      return <tr key={obj.id}><td>{obj.city}</td><td style={obj.city_status === "active" ? {color:"green"} : {color:"red"} }>{obj.city_status}</td>{uType === "superadmin" && <td><span className="btnspan" onClick={() => handleActivation(obj.id, obj.city_status === "active" ? "inactive" : "active")}>{obj.city_status === "active" ? "Disable" :  "Enable"}</span></td>}</tr>
    })
  
    return(
      <div className="servicesCatContainer"> 
        <Heading1 name="Cities" />
        <table>
          <thead>
            <tr>
              <th>Cities Name</th>
              <th>Status</th>
              {
                uType === "superadmin" 
                &&
                <th colSpan={2}>Active/InActive</th>
              }
            </tr>
          </thead>
          <tbody>
            {citiesMap}
          </tbody>
        </table>
      </div>
    )
  }
}


export default ShowCities