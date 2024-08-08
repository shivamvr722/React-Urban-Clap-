import { useState, useEffect } from "react"
import "./reviews_ratings.css"
import TableHead from "../../subcomponents/HeadingCoponets/TableHead"
import useFetchData from "../../../Networks/useFetchData"


const ViewsRatings = () => {
  const [ratings, setRatings] = useState("")
  const [orderField, setOrderField] = useState("")
  const [isEdit, setIsEdit] = useState("")
  const {isLoading, dataFetch} = useFetchData();

  
  const getReviews = async () => {
    const URL = `viewratings/?ordering=${orderField}`
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      setRatings(apiData.data)
    } else {
      alert("somethig went wrong while fetching the data for ratings")
    }
  }

  useEffect(()=>{
    getReviews()
  }, [orderField])

  let ratingsMapped = []
  if(ratings.length > 0){   
    ratingsMapped = ratings?.map((obj, i)=>{
      // if(isEdit !== obj.id){
      return <tr key={obj.id}><td>{obj.user}</td><td>{obj.services}</td><td>{obj.ratings}</td></tr> //<td onClick={() => { setIsEdit(obj.id); console.log(obj.id)}} >Edit</td>
      // } else {
      //   return <tr key={obj.id}><td>{obj.user}</td><td>{obj.services}</td><td>{obj.ratings}</td><td onClick={() => { setIsEdit(""); console.log(obj.id)}} >Update</td></tr>
      // }
    })
  }

  const tname = ["booking__user__username", "booking__service__service_type__service_type", "ratings"]
  const ttname = ["Username", "Services", "Ratings"]
  const heads = tname.map((field, i) => {
    return <TableHead key={i} name={field} titleName={ttname[i]} orderField={orderField} setOrderField={setOrderField} />
  })

  return(
    <div className="ratings">
      <h1 className="rr">Ratings</h1>
      <div className="bookingsDiv">
        <table>
          <thead>
            <tr>
              {heads}
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


