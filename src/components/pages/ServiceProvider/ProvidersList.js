import { useState, useEffect } from "react"
import useFetchData from "../../../Networks/useFetchData"
import "./serviceprovider.css"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import axios from "axios"


const ProvidersList = () => {
  const [providers, setProviders] = useState("")
  const { isLoading, dataFetch } = useFetchData()
  const [isVarified, setIsVarified] = useState("")

  const fetchData = async () => {
    const apiData = await dataFetch("services")
    if (apiData?.success) { 
      setProviders(apiData?.data?.results);
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }


  const handleVarify = async (id, status) => {
    const URL = `http://127.0.0.1:8000/urban-company/services/${id}/`
    try{
      const putValue = {"service_status": status}
      const resposne = await axios.patch(URL, putValue, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      const data = await resposne.data
      setProviders(providers.map((obj, i)=> obj?.id === id ? {...obj, service_status: data.service_status} : obj ))
    } catch (error) {
      console.log(error.resposne.data)
    }    
  }
 
  useEffect(
    () => { fetchData() },
  [])
  if(providers?.length > 0){
    const mappedData = providers?.map((obj, i )=> {
      return(
        
        <tr key={obj.id}>
        {/* {obj.service_status !== "deleted" && */}
          <td>{i+1}</td>
          <td><a href={"http://localhost:8000" + obj.profile} target="_blank"><div className="serviceImage"><img  src={"http://localhost:8000" + obj.service_image}/></div></a></td>
          <td>{obj?.getUser[0]?.username}</td>
          <td>{obj?.serviceType[0]?.service_type}</td>
          <td>{obj?.subServiceType[0]?.sub_service}</td>
          <td>{obj?.getStates[0]?.state}</td>
          <td>{obj?.getCity[0]?.city}</td>
          <td>{obj.service_duration}</td>
          <td>{obj.service_description}</td>
          <td>{obj.service_charges}</td>
          <td><a href={"http://localhost:8000" + obj.document_file} target="_blank"><div className="docLink">View Doc</div></a></td>
          <td>{obj.service_status}</td>
          <td><div className="varification" onClick={() => handleVarify(obj.id, "verified")}>Verify</div></td>
          <td><div className="varification" onClick={() => handleVarify(obj.id, "unverified")}>Unverify</div></td>
          <td><div className="varification" onClick={() => handleVarify(obj.id, "deleted")}>Delete</div></td>
        {/* } */}
        </tr>
        
      )
    })
  

    return(
      <>
        <NavigationBar />
        <div className="serviceListDiv">
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Service Image</th>
              <th>User</th>
              <th>Service</th>
              <th>Sub Service</th>
              <th>State</th>
              <th>City</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Charges</th>
              <th>Documents</th>
              <th>Status</th>
              <th colSpan={3}>Status Varification</th>
            </tr>
          </thead>
          <tbody>
            {mappedData}
          </tbody>
        </table>
        </div>
      </>
    )
  }
}

export default ProvidersList