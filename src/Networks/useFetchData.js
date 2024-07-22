import axios from "axios"
import { useEffect, useMemo, useState } from "react"


const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [apiData, setApiData] = useState(null);
  // const [serverError, setServerError] = useState(null);
  
  
  const dataFetch = async (urlEndPoint) => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}${urlEndPoint}/`
    try{
      if(!urlEndPoint){
        return
      }
      const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      const data = await response.data;
      setIsLoading(false);
      return {"data": data, "success": true}
      // setApiData(data);
    } catch (error) {
      setIsLoading(false);
      // setServerError(error?.response)
      return {"error": error.response, "success":false}
    }
  }

  
  // use(
  //   ()=> {
  //     dataFetch()
  // }, [URL])

  
  return { isLoading, dataFetch };
}

export default useFetchData