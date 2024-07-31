import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import ViewsRatings from "./ViewRatings"
import ViewReviews from "./ViewReview"

const RatingsReviewPage = () => {
  return (
    <div>
      <NavigationBar />
    <div>
      <ViewReviews />
      <ViewsRatings />
    </div>
    </div>
  )
}

export default RatingsReviewPage