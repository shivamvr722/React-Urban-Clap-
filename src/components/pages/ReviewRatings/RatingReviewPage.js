import { useSelector } from "react-redux"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import AddRating from "./AddRatings"
import AddReview from "./AddReview"
import ViewsRatings from "./ViewRatings"
import ViewReviews from "./ViewReview"

const RatingsReviewPage = () => {
  const currentUser = useSelector((state) => state.userProfileActions.user)
  
  return (
    <div>
      <NavigationBar />
      {(currentUser.user_type.toLowerCase() !== "serviceprovider")  &&  <><AddReview /><AddRating /></>}
    <div>
      <ViewReviews />
      <ViewsRatings />
    </div>
    </div>
  )
}

export default RatingsReviewPage