import { useEffect, useState } from "react";
import useFetchData from "../../../Networks/useFetchData";
import NavigationBar from "../../subcomponents/Header/navbar/Navbar";
import "./notifications.css"
import { useSelector } from "react-redux";
import TableHead from "../../subcomponents/HeadingCoponets/TableHead";


const PushedNotification  = () => {
  const { isLoading, dataFetch } = useFetchData();
  const [page, setPage] = useState(1);
  const [filterMessage, setFilterMessage] = useState("")
  const [orderField, setOrderField] = useState("")
  const [notifications, setNotifications] = useState("")
  const [notificationsPage, setNotificationsPage] = useState("")
  const currentUser = useSelector((state) => state.userProfileActions.user)

  const fetchOffersAll = async () => {
    let URL = "";
    if(currentUser.user_type === "superadmin"){
      URL = `offerstouser/?p=${page}&search=${filterMessage}&ordering=${orderField}`
    } else {
      URL = `offernotification/?p=${page}&search=${filterMessage}&ordering=${orderField}`
    }
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      const dt = apiData?.data
      setNotificationsPage({next:dt.next, previous: dt.previous, count: dt.count, records: dt.results?.length})
      setNotifications(apiData?.data?.results)
    }
  }

  useEffect(()=>{ fetchOffersAll() },
  [page, filterMessage, orderField])


  let notificationMap = <tr></tr>
  if(notifications?.length > 0){
    notificationMap = notifications?.map((obj, i) => {
      return <tr key={obj.id} className="books"><td>{obj?.id}</td><td>{obj?.getUser}</td><td>{obj.message}</td><td>{new Date(obj.created_at).toLocaleString()}</td></tr>
    })
  }

  const tname = ["user__username", "message", "created_at"]
  const ttname = ["User name", "Message", "Notification Time"]
  const heads = tname.map((field, i) => {
    return <TableHead key={i} name={field} titleName={ttname[i]} orderField={orderField} setOrderField={setOrderField} />
  })

  return(
    <div>
      <NavigationBar />
      <input type="text" id="search" placeholder="Search here..." onChange={(e) => setFilterMessage(e.target.value)} value={filterMessage} />
      <div className="bookingsDiv">
        <h2 className="booking">Offers</h2>
        <table>
          <thead>
            <tr>
              <th>Ref Id</th>
              {heads}
            </tr>
          </thead>
          <tbody>
            {notificationMap.length ? notificationMap : <tr className="w-full"><td className="p-4 font-[900]" colSpan={14}>No Data Available : ( </td></tr>}
          </tbody>
      </table>
      </div>
      <p>{notificationsPage?.previous && <><span className="btnPagination" onClick={() => { setPage( 1 )}}>First</span><span className="btnPagination" onClick={() => { setPage( page - 1 )}}>Prev</span></>}<span className="currentPage">{page}</span>{notificationsPage?.next && <><span className="btnPagination" onClick={() => { setPage( page + 1 )} }>Next</span><span className="btnPagination" onClick={() => { setPage( Math.ceil(notificationsPage.count / 10) )} }>Last</span></>}<span className="currentPage">({notificationsPage.records} / {notificationsPage.count})</span></p>
    </div>
    
  )
}


export default PushedNotification