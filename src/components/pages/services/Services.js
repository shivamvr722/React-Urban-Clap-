import { useEffect, useState } from "react"
import "./services.css"
import axios from "axios"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { useDispatch, useSelector } from "react-redux"
import { addService } from "../../../features/services"
import PopUp from "../../subcomponents/Popup"

const Services = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const HandleRemovePopUp = () => setOpenPopup(false);
  const dispatch = useDispatch()
  const URL = "http://127.0.0.1:8000/urban-company/service/"

  const servicesFetch = async () => {
    try{
      const response = await axios.get(URL, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
      dispatch(addService(response.data))
    } catch (error) {
      console.log(error.data)
    }
  }

  useEffect(()=>{
    servicesFetch()
  }, [])

  
  const servicesData = useSelector(state => state.servicesActions.services)

  let serviceMapped = ""
  if(servicesData.length > 0){
    serviceMapped = servicesData?.map((obj, i)=>{
      return <div key={obj.service_type} className="servicecategory" onClick={()=>{ console.log(obj.id) }}>{obj.service_type}</div>
    })

    serviceMapped = servicesData?.map((obj, i) => {
      return (
      <div>
        <div onClick={() => setOpenPopup(true)} className="servicecategory" > {obj.service_type} </div>
        <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} service={obj.service_type} />
      </div>
    )
    })

  return(
    // <div className="servicesCont">
      <div className="servicesCatContainer">
        <Heading1 name="Services" />
        {serviceMapped}
      </div>
    // </div>
  )
}
}



      // <div>
      //   <div className='w-full p-5 flex justify-center items-center'>
      //     <div>
      //       <button
      //         onClick={() => setOpenPopup(true)}
      //         className='bg-blue-300 text-blue-500 border border-blue-400 rounded-md px-5 py-2 hover:bg-blue-100'
      //       >
      //         Show Model PopUp
      //       </button>
      //     </div>
      //     <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} />
      //   </div>
      // </div>

export default Services