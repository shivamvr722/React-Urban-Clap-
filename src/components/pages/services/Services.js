import { useEffect, useState } from "react"
import "./services.css"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { useDispatch, useSelector } from "react-redux"
import { addService } from "../../../features/services"
import useFetchData from "../../../Networks/useFetchData"
import ServiceCards from "../../subcomponents/cards/ServiceCards"
import PopUpContainer from "../../subcomponents/cards/popUpContainer"
import HorizontalMiniCard from "../../subcomponents/cards/HorizontalMiniCard"



const Services = () => {
  const dispatch = useDispatch()
  const { isLoading, dataFetch } = useFetchData()

  const [open, setOpen] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [filteredSubServices, setFilteredSubServices] = useState("")

  const onClose = () => {
    console.log("close")
  }

  const onNext = () => {
    console.log("on Next")
  }


  const fetchData = async () => {
    const apiData = await dataFetch("service")
    if (apiData?.success) {
      dispatch(addService(apiData?.data))
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }
 
  useEffect(
    () => { fetchData() },
  [])

  // to toggle sub services
  const onServiceClick = (filteredData) => {
    if(filteredData?.length > 0){
      const mapList = filteredData?.map((data, i) => {
        return(
          <div className="horizontalSub" key={data.id} >
            <HorizontalMiniCard subId={data.id} serviceId={data.service_type} name={data.sub_service} />
          </div>
        )
      })
      setFilteredSubServices(mapList)
      setOpen(true)
    } else {
      alert("sorry no services available for selected option!")
    }
  }
  

  // to show the main services 
  const servicesData = useSelector(state => state.servicesActions.services)
  let serviceMapped = ""
  if(servicesData?.length > 0){
    serviceMapped = servicesData?.map((obj, i) => {
      return(
        <div key={obj.service_type + i}>
          <ServiceCards name={obj.service_type} id={obj.id} onServiceClick={onServiceClick} />
        </div>
      )
    })
  return(
    // <div className="servicesCont">
    <div className="h-[37rem] overflow-y-auto">
      <div className="servicesCatContaine11 flex gap-3 flex-wrap space-x-8 justify-center" >
        <Heading1 name="Services"/>
        {serviceMapped}
      </div>
      <div>
      <PopUpContainer open={open} setOpen={setOpen}>{filteredSubServices}</PopUpContainer>
      </div>
    </div>
  )
}
}


export default Services