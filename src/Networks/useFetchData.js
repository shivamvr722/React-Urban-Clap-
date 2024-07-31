import axios from "axios"
import { useState } from "react"


const useFetchData = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const dataFetch = async (urlEndPoint) => {
    let URL = ""
    if(urlEndPoint.includes("/?p=")){
      URL = `${process.env.REACT_APP_API_BASE_URL}${urlEndPoint}`
    } else {
      URL = `${process.env.REACT_APP_API_BASE_URL}${urlEndPoint}/`
    }
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
  return { isLoading, dataFetch };
}

export default useFetchData