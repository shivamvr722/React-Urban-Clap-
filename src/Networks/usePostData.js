import axios from "axios"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"


const usePostData = () => {
  const [isLoading, setIsLoading] = useState(null);
  
  const postData = async (urlEndPoint, values) => {
    try{
      const URL = `${process.env.REACT_APP_API_BASE_URL}${urlEndPoint}/`
      const response = await axios.post(URL, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      setIsLoading(false);
      return {"data":response.data, "status": 201}
    } catch (error) {
      setIsLoading(false);
      return {"error": error.response}
    }
  }
  return { isLoading, postData };
}

export default usePostData

    