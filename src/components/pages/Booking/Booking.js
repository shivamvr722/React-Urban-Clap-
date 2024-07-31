import {   useEffect, useState } from "react"
import useFetchData from "../../../Networks/useFetchData"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import Button from "../../subcomponents/FormComponets/Button"
import axios from "axios"

const Booking = () => {
  const {isLoading, dataFetch}  = useFetchData()
  const [bookings, setBookings] = useState("")

  const orderHandler = async (id, value) => {
    const URL = `http://127.0.0.1:8000/urban-company/bookings/${id}/`
    try{
      const putValue = {"service_status": value}
      const resposne = await axios.put(URL, putValue, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      const data = await resposne.data;
      setBookings(bookings.map((obj, i)=> obj?.id === id ? {...obj, service_status: data.data.service_status} : obj ))
    } catch (error) {
      console.log(error.resposne.data)
    }    
  }

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
      return <tr key={Math.random()} className="books"><td>{obj?.id}</td><td>{obj?.service}</td><td>{obj.slotdatetime}</td><td>{obj?.service_address}</td><td>{obj?.user_id}</td><td>{obj?.service_status}</td>{obj?.service_status?.trim().toLowerCase() === "pending" ? <><td><Button name="Accept" type={"button"} handleAction={() => orderHandler(obj?.id, "accepted")} /></td><td><Button name="reject" type={"button"} handleAction={() => orderHandler(obj?.id, "rejected")} /></td></> : <td colSpan={2}>{"Answered"}</td>}</tr>
    })
  }
  

  return(
    <div>
      {console.log({bookings})}
    <NavigationBar />
    <div className="bookingsDiv">
      <h2 className="booking">Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Service Id</th>
            <th>TimeSlot</th>
            <th>Addess</th>
            <th>User</th>
            <th>Stutus</th>
            <th>Accept</th>
            <th>Reject</th>
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
