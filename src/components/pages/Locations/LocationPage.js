import { useSelector } from "react-redux"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import AddCity from "./AddCities"
import AddState from "./AddState"
import ShowCities from "./ShowCities"
import ShowStates from "./ShowCityStates"

const LocationPage = () => {
  const currentUser = useSelector((state) => state.userProfileActions.user)

  return (
    <div>
      <NavigationBar />
      <div>
        {currentUser.user_type.toLowerCase() === "superadmin" 
          &&
          <>
            <AddCity />
            <AddState />
          </>
        }
        <ShowStates />
        <ShowCities />
      </div>
    </div>
  )
}

export default LocationPage