import { useSelector } from "react-redux"
import logo from "../../../assets/uclogo.png"
const ProviderCard = ({data, servicesData, onBookServiceClick}) => {
  const ImageURL = `http://localhost:8000/media/${data.service_image}`;
  if(!data.service_image){
    ImageURL = logo
  }

  const state = servicesData.state[0].state;
  const city = servicesData.city[0].city;
  const name = servicesData.name
  const serviceId = data.service_type;
  const subServiceid  = data.sub_service_type;
  const stateId = data.state;
  const cityId = data.city

  const bookingDataHandler = () => {
    data = {"stateId": stateId, "cityId": cityId, "serviceId": serviceId}
    onBookServiceClick(data)
  }

  
  return(
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={ImageURL} alt="image" />
      </a>
      <div className="p-5">
          <a href="#">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name.toUpperCase()}</h2>
          </a>
          <p className="font-bold text-white">Description:</p>
          <p className="mb-3 font-normal text-white dark:text-gray-400">{data.service_description}</p>
          <p className="mb-3 font-bold text-white">State: {state}</p>
          <p className="mb-3 font-bold text-white">City: {city}</p>
          <p className="mb-3 font-bold text-white">Service Duration: {data.service_duration} Minutes</p>
          <p className="mb-3 font-bold text-white">Charges: Rs. {data.service_charges}</p>
          <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ bookingDataHandler }>
            Book Service
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </p>
      </div>
    </div>
  )
}

export default ProviderCard