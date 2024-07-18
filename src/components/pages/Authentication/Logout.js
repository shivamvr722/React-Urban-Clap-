import axios from "axios"
import { AiFillDropboxSquare } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

// on pending
const Logout = () => {
  const navigate = useNavigate()
  const URL = "http://127.0.0.1:8000/urban-company/logout/"
  try {
    const response = async () =>{ 
      await axios.post(URL, {"refresh":localStorage.getItem("refresh")}, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}}) 
      console.log(response.data)
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      window.location = "/"
    }
    response()
  } catch (error) {
    alert("Sorry, something went wrong while logout!")
    console.log(error)
  }

}


export default Logout