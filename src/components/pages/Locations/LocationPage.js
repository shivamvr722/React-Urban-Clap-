import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import AddCity from "./AddCities"
import AddState from "./AddState"
import ShowStates from "./ShowCityStates"

const LocationPage = () => {
  return (
    <div>
      <NavigationBar />
      <div>
        <AddCity />
        <AddState />
        <ShowStates />
      </div>
    </div>
  )
}

export default LocationPage