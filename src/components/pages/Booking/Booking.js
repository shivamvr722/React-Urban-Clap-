import {   useEffect, useState } from "react"
import useFetchData from "../../../Networks/useFetchData"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import Button from "../../subcomponents/FormComponets/Button"
import axios from "axios"
import { useSelector } from "react-redux"
import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideFill } from "react-icons/ri";

const Booking = () => {
  const {isLoading, dataFetch}  = useFetchData()
  const [bookings, setBookings] = useState("")
  const [filteredBookings, setfilteredBookings] = useState("")
  const [bookPagination, setBookPagination] = useState("")
  const [searchBookings, setSearchBookings] = useState("")
  const [orderField, setOrderField] = useState("")
  const [page, setPage] = useState(1)
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const utype = currentUser.user_type
  const orderHandler = async (id, value) => {
    const URL = `http://127.0.0.1:8000/urban-company/bookings/${id}/`
    try{
      const putValue = {"service_status": value}
      const response = await axios.put(URL, putValue, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      const data = await response.data
      console.log(response, data)
      setBookings(bookings.map((obj, i)=> obj?.id === id ? {...obj, service_status: data.data.service_status} : obj ))
    } catch (error) {
      console.log(error.response.data)
    }    
  }

  const fetchBookings = async () => {
    let URL = ""
    if(filteredBookings){
      URL = `bookings/?p=${page}&service_status__iexact=${filteredBookings}`; //&service_status__iexact=${null}
    } else {
      URL = `bookings/?p=${page}&service_address__icontains=${searchBookings}&ordering=${orderField}`;
    }
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      const dt = apiData?.data
      setBookPagination({next:dt.next, previous: dt.previous, count: dt.count, records: dt.results?.length} )
      setBookings(apiData?.data.results)
    }
  }

  useEffect(
    () => { 
      fetchBookings();
    }, 
  [filteredBookings, page, orderField, searchBookings])

  let bookedMap = <tr></tr>
  if(bookings?.length > 0){
    bookedMap = bookings?.map((obj, i) => {
      return (
        <tr key={Math.random()} className="books">
          <td>{obj?.id}</td>
          <td>{obj?.getService}</td>
          <td>{obj.getUser}</td>
          <td>{new Date(obj.slotdatetime).toLocaleString()}</td>
          <td>{obj?.service_address}</td>
          <td style={obj?.service_status === "pending" ? {color: "yellow"} : obj?.service_status === "accepted" ? {color: "orange"} : obj?.service_status === "inprogress" ? {color: "green"} : obj?.service_status === "completed" ? {color: "aqua"}: obj?.service_status === "cancelled" ? {color: "#ab0202"} : {color: "red"} }>{obj?.service_status}</td>
          { 
            obj?.service_status?.trim().toLowerCase() === "pending" 
            ? <>
              <td>
                {
                  utype !== "user" 
                  && 
                  <Button name="Accept" type={"button"} handleAction={() => orderHandler(obj?.id, "accepted")} />
                }
                <Button 
                  name={utype === "user" ? "Cancel Booking" : "Reject"} 
                  type={"button"} 
                  handleAction={() => orderHandler(obj?.id, utype === "user" ? "cancelled" : "rejected")} />
              </td>
              </> 
            : 
              <>
                {
                  obj?.service_status?.trim().toLowerCase() === "accepted" && utype !== "user"
                  ? 
                    <td>
                      <Button 
                        name={"In Progress"} 
                        type={"button"} 
                        handleAction={() => orderHandler(obj?.id, "inprogress")} 
                      />
                    </td>
                  : 
                    obj?.service_status?.trim().toLowerCase() === "inprogress"
                    ?
                    <td>
                      <Button 
                        name={utype === "user" ? "Cancel Booking" : "Complete" } 
                        type={"button"} 
                        handleAction={() => orderHandler(obj?.id, utype === "user" ? "cancelled" : "completed" )} 
                      />
                    </td>
                    :
                      <td colSpan={2}>{"Answered"}</td>
                }
              </>
              }</tr>)
    })
  }
  

  return(
    <div>
    <NavigationBar />
    <input type="text" id="search" placeholder="Search here..." onChange={(e) => setSearchBookings(e.target.value)} value={searchBookings} />
    <select onChange={(e)=> setfilteredBookings(e.target.value)} className="selectbox">
      <option value={''}>All Bookings</option>
      <option value={"accepted"}>Accepted</option>
      <option value={"pending"}>Pending</option>
      <option value={"inprogress"}>In Progress</option>
      <option value={"completed"}>Completed</option>
      <option value={"rejected"}>Rejected</option>
      <option value={"cancelled"}>Cancelled</option>
    </select>
    <div className="bookingsDiv">
      <h2 className="booking">Bookings</h2>
      <table>
        <thead>
          <tr>
          <th onClick={() => setOrderField(orderField === "-id" ? "id" : "-id")} className="text-center"><span className="flex xflex"> Id {orderField === "-id" ? <RiArrowDownWideFill /> : <RiArrowUpWideFill />} </span></th>
            <th onClick={() => setOrderField(orderField === "-service__service_type__service_type" ? "service__service_type__service_type" : "-service__service_type__service_type")} className="text-center"><span className="flex xflex"> Service Name {orderField === "-service__service_type__service_type" ? <RiArrowDownWideFill /> : <RiArrowUpWideFill />} </span></th>
            <th onClick={() => setOrderField(orderField === "user__username" ? "-user__username" : "user__username")} className="text-center"><span className="flex xflex"> User Name {orderField === "-user__username" ? <RiArrowDownWideFill /> : <RiArrowUpWideFill />} </span></th>
            <th onClick={() => setOrderField(orderField === "-slotdatetime" ? "slotdatetime" : "-slotdatetime")} className="text-center"><span className="flex xflex"> TimeSlot {orderField === "-slotdatetime" ? <RiArrowDownWideFill /> : <RiArrowUpWideFill />} </span></th>
            <th onClick={() => setOrderField(orderField === "-service_address" ? "service_address" : "-service_address")} className="text-center"><span className="flex xflex"> Addess {orderField === "-service_address" ? <RiArrowDownWideFill /> : <RiArrowUpWideFill />} </span></th>
            <th onClick={() => setOrderField(orderField === "-service_status" ? "service_status" : "-service_status")} className="text-center"><span className="flex xflex"> Stutus {orderField === "-service_status" ? <RiArrowDownWideFill /> : <RiArrowUpWideFill />} </span></th>
            {utype === "user" ? <th>Booking Requested</th> : <th>Booking Requests</th> }
          </tr>
        </thead>
        <tbody>
          {bookedMap.length ? bookedMap : <tr className="w-full"><td className="p-4 font-[900]" colSpan={14}>No Data Available : ( </td></tr>}
        </tbody>
      </table>
    </div>
    <p>{bookPagination?.previous && <span className="btnPagination" onClick={() => { setPage( page - 1 )}}>Prev</span>}<span className="currentPage">{page}</span>{bookPagination?.next && <span className="btnPagination" onClick={() => { setPage( page + 1 )} }>Next</span>  }<span className="currentPage">({bookPagination.records} / {bookPagination.count})</span></p>
    </div>
  )
}


export default Booking
