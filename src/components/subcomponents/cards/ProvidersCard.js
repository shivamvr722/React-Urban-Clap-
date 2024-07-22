import { useSelector } from "react-redux"
import logo from "../../../assets/uclogo.png"
const ProviderCard = ({data}) => {
  const serviceId = data.service_type;
  const subServiceid  = data.sub_service_type;
  const stateId = data.state;
  const city = data.city;

  
  return(
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={logo || data.service_image} alt="image" />
      </a>
      <div className="p-5">
          <a href="#">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.name}</h2>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.service_description}</p>
          <p>{data.service_duration}</p>
          <p>{data.service_charges}</p>
          <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ () => console.log("hell")}>
            Show Services
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </p>
      </div>
    </div>
  )
}

export default ProviderCard