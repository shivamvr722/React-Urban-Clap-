import { useState, useEffect } from "react"
import useFetchData from "../../../Networks/useFetchData"
import "./serviceprovider.css"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import axios from "axios"


const ProvidersList = () => {
  const { isLoading, dataFetch } = useFetchData()
  const [providers, setProviders] = useState("")
  const [providersPage, setProvidersPage] = useState("")
  const [page, setPage] = useState(1);
  const [filterProvider, setFilterProvider] = useState("")
  const [searchProvider, setSearchProvider] = useState("")

  const fetchData = async () => {
    let URL = ""
    if(filterProvider){
      URL = `services/?p=${page}&service_status__iexact=${filterProvider}`;
    } else {
      URL = `services/?p=${page}&service_description__icontains=${searchProvider}`;
    }
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      setProviders(apiData?.data?.results);
      setProvidersPage({next: apiData?.data?.next, previous: apiData?.data?.previous, count: apiData?.data?.count, records: apiData?.data?.results?.length})
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }
  useEffect(
    () => { fetchData() },
  [searchProvider, page, filterProvider])


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
 
  

  if(providers){
    const mappedData = providers?.map((obj, i )=> {
      return(
        
        <tr key={obj.id}  className="w-full">
        {(obj.service_status !== "deleted" || (filterProvider === "deleted" && obj.service_status === "deleted")) && <>
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
          <td style={obj.service_status === "verified" ? {color:"green"} : {color:"yellow"}}>{obj.service_status}</td>
          {obj.service_status === "unverified" || obj.service_status === "deleted"  && <td><div className="varification" style={{backgroundColor:"orange"}} onClick={() => handleVarify(obj.id, "unverified")} >{obj.service_status !== "deleted" ? "Unverify" : "Undo" }</div></td>}
          {obj.service_status !== "deleted" && 
          <>
            <td><div className="varification" style={obj.service_status !== "verified"  ? {backgroundColor:"blue"} : {backgroundColor: "green"}} onClick={() => handleVarify(obj.id, obj.service_status !== "verified"  ? "verified" : "unverified")}>{obj.service_status !== "verified"  ? "Verify" : "Unverify"}</div></td>
            <td><div className="varification" style={{backgroundColor:"red"}} onClick={() => handleVarify(obj.id, "deleted")}>Delete</div></td>
          </>
          }
          </>} 
        </tr>
      )
    })
  

    return(
      <>
        <NavigationBar />
        <input type="text" id="search" placeholder="Search here..." onChange={(e) => setSearchProvider(e.target.value)} value={searchProvider} name="search" />
        <select onChange={(e)=> setFilterProvider(e.target.value)} className="selectbox">
          <option value={''}>All Providers</option>
          <option value={"unverified"}>Unverified</option>
          <option value={"verified"}>Verified</option>
          <option value={"deleted"}>Deleted</option>
        </select>
        <div className="bookingsDiv">
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
              <th colSpan={3}>Request Varification</th>
            </tr>
          </thead>
          <tbody>
            {mappedData.length ? mappedData : <tr className="w-full"><td className="p-4 font-[900]" colSpan={14}>No Data Available : ( </td></tr>}
          </tbody>
        </table>
        <div>
        </div>
          <p>{providersPage?.previous && <><span className="btnPagination" onClick={() => { setPage( 1 )}}>First</span><span className="btnPagination" onClick={() => { setPage( page - 1 )}}>Prev</span></>}<span className="currentPage">{page}</span>{providersPage?.next && <><span className="btnPagination" onClick={() => { setPage( page + 1 )} }>Next</span><span className="btnPagination" onClick={() => { setPage(Math.ceil(providersPage.count/10) )}}>Last</span></> }<span className="currentPage">({providersPage.records} / {providersPage.count})</span></p>
        </div>
      </>
    )
  }
}

export default ProvidersList