// http://127.0.0.1:8000/urban-company/viewratings/

import axios from "axios"
import { useState, useEffect } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import "./reviews.css"




const ViewsRatings = () => {
  const [ratings, setRatings] = useState("")

  const URL = "http://127.0.0.1:8000/urban-company/viewratings/"

  const getReviews = async () => {
    try{
      const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
      console.log(response.data);
      setRatings(response.data)
    } catch (error) {
      console.log(error.data)
    }
  }

  useEffect(()=>{
    getReviews()
  }, [])

  let ratingsMapped = []
  if(ratings.length > 0){   
    ratingsMapped = ratings?.map((obj, i)=>{
      return <tr key={obj.id}><td>{obj.user}</td><td>{obj.services}</td><td>{obj.ratings}</td><td onClick={() => { console.log(obj.id)}} >Edit</td><td onClick={() => { console.log(obj.id)}}>Delete</td></tr>
    })
  }

  

  return(
    <div className="reviews">
      <Heading1 name={"Ratings"} />
      <div className="tablereview">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Services</th>
              <th>Ratings</th>
              <th>Edit</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {ratingsMapped}
          </tbody>
        </table>
      </div>
    </div>

  )
}
export default ViewsRatings


