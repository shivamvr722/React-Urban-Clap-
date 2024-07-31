import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import AddCity from "./AddCities"
import AddState from "./AddState"
import ShowCities from "./ShowCities"
import ShowStates from "./ShowCityStates"

const LocationPage = () => {
  return (
    <div>
      <NavigationBar />
      <div>
        <AddCity />
        <AddState />
        <ShowStates />
        <ShowCities />
      </div>
    </div>
  )
}

export default LocationPage