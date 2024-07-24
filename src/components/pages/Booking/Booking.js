import {   useEffect, useState } from "react"
import useFetchData from "../../../Networks/useFetchData"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"

const Booking = () => {
  const {isLoading, dataFetch}  = useFetchData()
  const [bookings, setBookings] = useState("")
  const fetchBookings = async () => {
    const apiData = await dataFetch('bookings')
    if (apiData?.success) {
      setBookings(apiData?.data)
    }
  }

  useEffect(
    () => { 
      fetchBookings();
    }, 
  [])

  let bookedMap = <tr></tr>
  if(bookings?.length > 0){
    bookedMap = bookings?.map((obj, i) => {
      return <tr key={Math.random()} className="books"><td>{obj.service}</td><td>{obj.state}</td><td>{obj.city}</td><td>{obj.slotdatetime}</td><td>{obj.service_address}</td></tr>
    })
  }
  

  return(
    <div>
    <NavigationBar />
    <div className="bookingsDiv">
      <h2>Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>BookId</th>
            <th>StateId</th>
            <th>CityId</th>
            <th>TimeSlot</th>
            <th>Addess</th>
          </tr>
        </thead>
        <tbody>
          {bookedMap}
        </tbody>
      </table>
    </div>
    </div>
  )
}


export default Booking
