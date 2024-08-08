import { useState, useEffect } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import "./reviews_ratings.css"
import useFetchData from "../../../Networks/useFetchData";
import TableHead from "../../subcomponents/HeadingCoponets/TableHead";




const ViewReviews = () => {
  const { isLoading, dataFetch } = useFetchData();
  const [reviews, setReviews] = useState("")
  const [orderField, setOrderField] = useState("")

  const fetchReviews = async () => {
    const URL = `viewreview/?ordering=${orderField}`
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      setReviews(apiData?.data)
    }
  }

  useEffect(
    () => { fetchReviews() },
  [orderField])

  const tname = ["booking__user__username", "booking__service__service_type__service_type", "review"]
  const ttname = ["Username", "Services", "Review"]
  const heads = tname.map((field, i) => {
    return <TableHead  key={i} name={field} titleName={ttname[i]} orderField={orderField} setOrderField={setOrderField} />
  })

  let reviewMapped = []
  if(reviews.length > 0){   
    reviewMapped = reviews?.map((obj, i)=>{
      return <tr key={obj.id}><td>{obj.user}</td><td>{obj.services}</td><td>{obj.review}</td></tr> //<td onClick={() => { console.log(obj.id)}} >Edit</td><td onClick={() => { console.log(obj.id)}}>Delete</td>  <td onClick={() => { console.log(obj.id)}} >Edit</td><td onClick={() => { console.log(obj.id)}}>Delete</td>
    })
  }

  
  return(
    <div className="reviews">
      <h2 className="rr">Reviews</h2>
      <div className="bookingsDiv">
        <table>
          <thead>
            <tr>
              {heads}
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


