import { useEffect, useState } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import "./location.css"
import useFetchData from "../../../Networks/useFetchData"
import { useSelector } from "react-redux"
import usePatchData from "../../../Networks/usePatchData"
import TableHead from "../../subcomponents/HeadingCoponets/TableHead"



const ShowCities = () => {
  const { isLoading, dataFetch } = useFetchData();
  const { isLoadingPatch, patchData } = usePatchData();
  const [cities, setCities] = useState("")
  const [orderField, setOrderField] = useState("")
  const [searchField, setSearchField] = useState("")
  const [filterField, setFilterField] = useState("")
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const uType = currentUser.user_type.toLowerCase()

  const handleActivation = async (id, status) => {
    const URL = `city/${id}`
    try{
      const putValue = {"city_status": status}
      const apiData = await patchData(URL, putValue)
      const data = await apiData?.data
      setCities(cities.map((obj, i)=> obj?.id === id ? {...obj, city_status: data?.city_status} : obj ))
    } catch (error) {
      console.log(error.resposne.data)
    }    
  }

  
  const fetchCities = async () => {
    const URL = `city/?ordering=${orderField}&search=${searchField}&city_status__iexact=${filterField}`
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      setCities(apiData?.data)
    }
  }

  useEffect(
    () => { fetchCities() },
  [orderField, searchField, filterField])
  
  const tname = ["state_id__state", "city", "city_status"]
  const ttname = ["State", "Cities", "Status"]
  const heads = tname.map((field, i) => {
    return <TableHead key={i} name={field} titleName={ttname[i]} orderField={orderField} setOrderField={setOrderField} />
  })
  
  if(cities) {
    const citiesMap = cities?.map((obj, i) =>{
      return <tr key={obj.id}><td>{obj.getState}</td><td>{obj.city}</td><td style={obj.city_status === "active" ? {color:"green"} : {color:"red"} }>{obj.city_status}</td>{uType === "superadmin" && <td><span className="btnspan" onClick={() => handleActivation(obj.id, obj.city_status === "active" ? "inactive" : "active")}>{obj.city_status === "active" ? "Disable" :  "Enable"}</span></td>}</tr>
    })
  
    return(
      <div className="servicesCatContainer"> 
        <Heading1 name="Cities" />
        <input type="text" id="search" placeholder="Search here..." onChange={(e) => setSearchField(e.target.value)} value={searchField} />
        <select onChange={(e)=> setFilterField(e.target.value)} className="selectbox" name='city_status__iexact'>
          <option value={''}>Filter By</option>
          <option value={"active"}>Active</option>
          <option value={"inactive"}>Inactive</option>
        </select>
        <table>
          <thead>
            <tr>
              {heads}
              {
                uType === "superadmin" 
                &&
                <th colSpan={2}>Active/InActive</th>
              }
            </tr>
          </thead>
          <tbody>
            {citiesMap?.length ? citiesMap : <tr><td colSpan={4}>NO Data Found : (</td></tr> }
          </tbody>
        </table>
      </div>
    )
  }
}


export default ShowCities