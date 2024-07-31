import axios from "axios"
import { useState } from "react"


const usePatchData = () => {
  const [isLoadingPatch, setIsLoading] = useState(null);
  
  const patchData = async (urlEndPoint, values) => {
    try{
      setIsLoading(true);
      const URL = `${process.env.REACT_APP_API_BASE_URL}${urlEndPoint}/`
      const response = await axios.patch(URL, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      setIsLoading(false);
      return {"data":response.data, "status": 200}
    } catch (error) {
      setIsLoading(false);
      return {"error": error.response, "status":304}
    }
  }
  return { isLoadingPatch, patchData };
}

export default usePatchData

    