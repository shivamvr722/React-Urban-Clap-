import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const DSCards = (props) => {
    const currentUser = useSelector((state) => state.userProfileActions.user)
    const cUser = currentUser.user_type
    const navigate = useNavigate();

    // for the customise the UIs dynamic content
    const titleAUser = [" Total Bookings", " Total Users", " Total Service Providers", " Pending Bookings", " Total Services", " Total Sub Services"]
    const titleUser = [" My Bookings", " My Services", " My Sub Services", " My Sub Services", " In Pending", " In Progress", " Completed"] 
    const bgcolorAUser = ["bg-green-600", "bg-blue-600", "bg-orange-600", "bg-purple-600", "bg-red-600", "bg-pink-600"]
    const bgcolorUser = ["bg-[#444444]", "bg-[#444444]", "bg-[#444444]", "bg-[#777777]", "bg-[#777777]", "bg-[#777777]"]
    const showCountAUser = [props.bookingsCount, props.usersCount, props.providersCount, props.pendingBookCount, props.servicesCount, props.subServiceCount]
    const showCountUser = [props.bookingsCount, props.servicesCount, props.subServiceCount, props.pendingBookCount, props.dataCounts.inprogress, props.dataCounts.completed]
    const showTextAUser = ["Bookings", " Users", "Providers", " Pending Bookings", " Total Services", " Total Sub Services"]  
    const showTextUser = ["Bookings", " Services", "Sub Services", " In Pending", " In Progress", " Completed" ] 
    

    const mappedCards = titleAUser.map((content, i) => {
        return(
            <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
                <div className={cUser === "user" ? `${bgcolorUser[i]} border rounded shadow p-2` : `${bgcolorAUser[i]} border rounded shadow p-2`} >
                    <div className="flex flex-row items-center">
                        <div className="flex-shrink pl-1 pr-4"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                        <div className="flex-1 text-right">
                            <h5 className="text-white">{cUser === "user" ? titleUser[i] : titleAUser[i]}</h5>
                            <h3 className="text-white text-3xl">{cUser === "user" ? showCountUser[i] || 0 : showCountAUser[i] || 0} {cUser === "user" ? showTextUser[i] || 0 : showTextAUser[i] || 0}<span className="text-green-400"><i className="fas fa-caret-down"></i></span></h3>
                        </div>
                    </div>
                </div>               
            </div>
        )
    })

    return(
        <div className="flex flex-wrap mb-2">
            {mappedCards}
        </div>
    )
}


export default DSCards