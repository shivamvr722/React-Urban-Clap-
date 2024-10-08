import { useEffect, useState } from "react"
import "./services.css"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { useDispatch, useSelector } from "react-redux"
import useFetchData from "../../../Networks/useFetchData"
import ServiceCards from "../../subcomponents/cards/ServiceCards"
import PopUpContainer from "../../subcomponents/cards/popUpContainer"
import HorizontalMiniCard from "../../subcomponents/cards/HorizontalMiniCard"
import ProviderCard from "../../subcomponents/cards/ProvidersCard"
import AddOrder from "../Booking/BookOrder"



const Services = () => {
  const dispatch = useDispatch()
  const { isLoading, dataFetch } = useFetchData()
  const [open, setOpen] = useState(false)
  const [cards, setCards] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [bookForm, setBookForm] = useState("")
  const [providers, setProviders] = useState("")
  const [filteredSubServices, setFilteredSubServices] = useState("")
  const [serviceProviderCards, setServiceProviderCards] = useState("")

  // const fetchCities = async () => {
  //   const apiData = await dataFetch('city')
  //   if (apiData?.success) {
  //     setCities(apiData?.data?.results)
  //   } 
  // }
  

  const fetchProviders = async () => {
    const apiData = await dataFetch("services")
    if (apiData?.success) {
      setProviders(apiData?.data?.results)
    } else if (!apiData?.success){
      console.log(apiData.error);
    }
  }

  useEffect(
    () => { 
      // fetchCities(); 
      fetchProviders();
    }, [])

  
  const onBookServiceClick = (data) => {
    setIsForm(true)
    setCards(false)
    setBookForm(<AddOrder data={data} setIsForm={setIsForm} setOpen={setOpen} />)
    
  }

  
  const onSubServiceClick = (servicesData) => {
    let flag = false;
    
    if(providers?.length > 0){
      const filtedProvideres = providers?.filter((data, i) => {
        return(`${data.sub_service_type}` === `${servicesData.subId}`)
      })
    
      const serviceProviderCards = filtedProvideres?.map((data, i) => {    
        if(data.service_status === "verified"){
          flag = true;
          const serviceData = {...servicesData, providerId: filtedProvideres?.[i]?.id, state: filtedProvideres?.[i].getStates?.[0].state, city: filtedProvideres?.[i].getCity?.[0]?.city}
          return <div className="mb-8" key={data.id}><ProviderCard data={data} onBookServiceClick={onBookServiceClick} servicesData={serviceData} key={data.id} /></div>
        }
      })
      if(flag === true){
        setServiceProviderCards(serviceProviderCards)
        setCards(true)
      } else {
        alert("sorry no providers are available for the service")  
      }

    } else {
      alert("sorry no providers are available for the service")
    }
    // console.log("hello providers: ", serviceProviders)
  }

  // to toggle sub services
  const onServiceClick = (filteredData) => {
    if(filteredData?.length > 0){
      const mapList = filteredData?.map((data, i) => {
        return(
          <div className="horizontalSub" key={data.id} >
            <HorizontalMiniCard subId={data.id} serviceId={data.service_type} name={data.sub_service} onSubServiceClick={onSubServiceClick} />
          </div>
        )
      })
      setFilteredSubServices(mapList)
      setOpen(true)
    } else {
      alert("sorry no services available for selected option!")
      setOpen(false)  
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
      {/* <div> */}
      {cards ? <PopUpContainer open={open} cards={cards} isForm={isForm} setCards={setCards} setIsForm={setIsForm} setOpen={setOpen}>{serviceProviderCards}</PopUpContainer> : <PopUpContainer cards={cards} setCards={setCards}  open={open} setOpen={setOpen}>{filteredSubServices}</PopUpContainer>}
      {isForm &&  <PopUpContainer open={open} cards={cards} isForm={isForm} setCards={setCards} setIsForm={setIsForm} setOpen={setOpen}>{bookForm}</PopUpContainer> }
      {/* </div> */}
    </div>
  )
  } else {
    return(<h3>NO DATA FOUND : (</h3>)
  }
}


export default Services


 // const fetchData = async () =>setOpen(true)
  //     dispatch(addService(apiData?.data))
  //   } else if (!apiData?.success){
  //     console.log(apiData.error);
  //   }
  // }
 