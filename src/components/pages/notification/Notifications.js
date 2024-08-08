import useFetchData from "../../../Networks/useFetchData";
import "./notifications.css";
import NavigationBar from "../../subcomponents/Header/navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import usePatchData from "../../../Networks/usePatchData";
import TableHead from "../../subcomponents/HeadingCoponets/TableHead";


const Notification = () => {
  const { isLoading, dataFetch } = useFetchData();
  const { isLoadingPatch, patchData } = usePatchData();
  const [isReadFlag, setIsReadFlag] = useState(false);
  const [page, setPage] = useState(1);
  const [filterMessage, setFilterMessage] = useState("")
  const [orderField, setOrderField] = useState("")
  const [notifications, setNotifications] = useState("")
  const [notificationsPage, setNotificationsPage] = useState("")
  const currentUser = useSelector((state) => state.userProfileActions.user)
  

  const fetchNotification = async (isRead=false) => {
    let URL = "";
    if(currentUser.user_type === "superadmin"){
      URL = `notification/?p=${page}&search=${filterMessage}&ordering=${orderField}&read=${isRead}`
    } else {
      URL = `notification/?p=${page}&search=${filterMessage}&ordering=${orderField}&read=${isRead}`
    }
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      const dt = apiData?.data
      setNotificationsPage({next:dt.next, previous: dt.previous, count: dt.count, records: dt.results?.length})
      setNotifications(apiData?.data?.results)
    }
  }


  useEffect(()=>{ 
    if(isReadFlag){
      fetchNotification(true)
    } else {
      fetchNotification(false) 
    }
  },
  [page, filterMessage, orderField])
  
  const tname = ["user__username", "message", "created_at"]
  const ttname = ["User name", "Message", "Notification Time"]
  const heads = tname.map((field, i) => {
    return <TableHead key={i} name={field} titleName={ttname[i]} orderField={orderField} setOrderField={setOrderField} />
  })

  let notificationMap = <tr></tr>
  if(notifications?.length > 0){
    notificationMap = notifications?.map((obj, i) => {
      return <tr key={obj.id} className="books"><td>{obj?.id}</td><td>{obj?.getUser}</td><td>{obj.message}</td><td>{new Date(obj.created_at).toLocaleString()}</td></tr>
    })
  }


  return(
    <div>
      <NavigationBar />
      <input type="text" id="search" placeholder="Search here..." onChange={(e) => setFilterMessage(e.target.value)} value={filterMessage} />
      <div className="bookingsDiv">
        <h2 className="booking">Offers</h2>
        <p><span className="spnbtn" onClick={() => {fetchNotification(false); setIsReadFlag(false)}}>New Notification</span><span  className="spnbtn" onClick={() => {fetchNotification(true); setIsReadFlag(true)}}>Notification History</span></p>
        <table>
          <thead>
            <tr>
              <th>Ref Id</th>
              {heads}
            </tr>
          </thead>
          <tbody>
            {notificationMap.length ? notificationMap : <tr className="w-full"><td className="p-4 font-[900]" colSpan={14}>No Notification Available : ( </td></tr>}
          </tbody>
      </table>
      </div>
      <p>{notificationsPage?.previous && <><span className="btnPagination" onClick={() => { setPage( 1 )}}>First</span><span className="btnPagination" onClick={() => { setPage( page - 1 )}}>Prev</span></>}<span className="currentPage">{page}</span>{notificationsPage?.next && <><span className="btnPagination" onClick={() => { setPage( page + 1 )} }>Next</span><span className="btnPagination" onClick={() => { setPage( Math.ceil(notificationsPage.count / 10) )} }>Last</span></>}<span className="currentPage">({notificationsPage.records} / {notificationsPage.count})</span></p>
    </div>)
}

export default Notification