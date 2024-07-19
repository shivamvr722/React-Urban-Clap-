import axios from "axios"
import { useState, useEffect } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import "./reviews.css"




const ViewReviews = () => {
  const [reviews, setReviews] = useState("")

  const URL = "http://127.0.0.1:8000/urban-company/viewreview/"

  const getReviews = async () => {
    try{
      const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
      console.log(response.data);
      setReviews(response.data)
    } catch (error) {
      console.log(error.data)
    }
  }

  useEffect(()=>{
    getReviews()
  }, [])

  let reviewMapped = []
  if(reviews.length > 0){   
    reviewMapped = reviews?.map((obj, i)=>{
      return <tr key={obj.id}><td>{obj.review}</td><td onClick={() => { console.log(obj.id)}} >Edit</td><td onClick={() => { console.log(obj.id)}}>Delete</td></tr>
    })
  }

  

  console.log(reviews)
  return(
    <div className="reviews">
      <Heading1 name={"Reviews"} />
      <div className="tablereview">
        <table>
          <thead>
            <tr>
              <th>Review</th>
              <th>Edit</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {reviewMapped}
          </tbody>
        </table>
      </div>
    </div>

  )
}
export default ViewReviews


