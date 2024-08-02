import { useState, useEffect } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import "./reviews_ratings.css"
import useFetchData from "../../../Networks/useFetchData";




const ViewReviews = () => {
  const { isLoading, dataFetch } = useFetchData();
  const [reviews, setReviews] = useState("")
  
  // const URL = "http://127.0.0.1:8000/urban-company/viewreview/"

  // const getReviews = async () => {
  //   try{
  //     const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
  //     console.log(response.data);
  //     setReviews(response.data)
  //   } catch (error) {
  //     console.log(error.data)
  //   }
  // }
  const fetchReviews = async () => {
    const apiData = await dataFetch('viewreview')
    if (apiData?.success) {
      setReviews(apiData?.data)
    }
  }

  useEffect(
    () => { fetchReviews() },
  [])


  let reviewMapped = []
  if(reviews.length > 0){   
    reviewMapped = reviews?.map((obj, i)=>{
      return <tr key={obj.id}><td>{obj.user}</td><td>{obj.services}</td><td>{obj.review}</td></tr> //<td onClick={() => { console.log(obj.id)}} >Edit</td><td onClick={() => { console.log(obj.id)}}>Delete</td>
    })
  }

  

  console.log(reviews)
  return(
    <div className="reviews">
      <h2 className="rr">Reviews</h2>
      <div className="bookingsDiv">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Services</th>
              <th>Review</th>
              {/* <th>Edit</th>
              <th>Update</th> */}
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


