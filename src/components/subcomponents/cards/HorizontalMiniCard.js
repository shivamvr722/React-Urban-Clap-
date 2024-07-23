import React from "react"
import logo from "../../../assets/uclogo.png"

const HorizontalMiniCard = (props) => {
  const handlerForServiceProvider = () => {
    console.log("hello from handler");
    props.onSubServiceClick({"subId": props?.subId, "serviceId": props?.serviceId, "name": props?.name})
  }


  return(
    <section onClick={handlerForServiceProvider} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={logo} alt="" />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h4>
        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
      </div>
    </section>
  )
}

export default HorizontalMiniCard