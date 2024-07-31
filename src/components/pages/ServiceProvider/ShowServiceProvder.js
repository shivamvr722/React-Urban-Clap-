import ProviderCard from "../../subcomponents/cards/ProvidersCard";
import useFetchData from "../../../Networks/useFetchData";
import { useEffect, useState } from "react";

const ShowServiceProvider = () => {
  const [providers, setProviders] = useState("")
  const { isLoading, dataFetch } = useFetchData()


  const fetchData = async () => {
    const apiData = await dataFetch("services")
    if (apiData?.success) {      
      setProviders(apiData?.data)
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }
 
  useEffect(
    () => { fetchData() },
  [])
  if(providers?.length > 0){
    const mappedData = providers?.map((obj, i )=> {
      return(
        <div key={obj.id}>
          {console.log(obj, "Rx")}
        </div>
      )
    })
  

  return(
    <div>
      {mappedData}
    </div>
  )
  }

}

export default ShowServiceProvider