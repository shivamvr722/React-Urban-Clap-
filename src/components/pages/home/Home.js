import "./home.css"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import Footer from "../../subcomponents/footers/footer"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import servicesImage from "../../../assets/serveces.webp"
import { addUser } from "../../../features/usersSlice"
import { useNavigate } from "react-router-dom"
import Services from "../services/Services"
import PopUp from "../../subcomponents/Popup"




const Home = ({link}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [openPopup, setOpenPopup] = useState(false);
  const HandleRemovePopUp = () => setOpenPopup(false);


  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/urban-company/userprofile/", {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
      if(response.data.length > 0){
        dispatch(addUser(response?.data[0]))
      }
    } catch (error) {
      console.log("this is the error part");
      if (error.response.status === 401) {
        navigate("/authredirect")
      }
      
    }
  }
  useEffect(()=>{
    fetchProfile()
  }, [])

  const userData = useSelector((state)=> state.userProfileActions.user); // can send it to navbar letter to make diff betwin roles

  
  return(
    <>
      <NavigationBar />
        <div className="maincontainer">
          <div className="servicesContainer1">
            <div className="serviceCat">
              <Services />
            </div>
            <div className="image1">
              <img src={servicesImage} width={900} height={900} />
            </div>
          </div>
          <div>
            <div className='w-full p-5 flex justify-center items-center'>
              <div>
                <button
                  onClick={() => setOpenPopup(true)}
                  className='bg-blue-300 text-blue-500 border border-blue-400 rounded-md px-5 py-2 hover:bg-blue-100'
                >
                  Show Model PopUp
                </button>
              </div>
              <PopUp openPopUp={openPopup} closePopUp={HandleRemovePopUp} />
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default Home



// <div className="maincontainer">
//         <div className="servicesContainer1">
//         <div className="max-w-sm rounded overflow-hidden shadow-lg">
//           <img className="w-full" src={servicesImage} alt="Sunset in the mountains" />
//           <div className="px-6 py-4">
//             <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
//             <p className="text-gray-700 text-base">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
//             </p>
//           </div>
//           <div className="px-6 pt-4 pb-2">
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
//           </div>
//         </div>
//         <div className="max-w-sm rounded overflow-hidden shadow-lg">
//           <img className="w-full" src={servicesImage} alt="Sunset in the mountains" />
//           <div className="px-6 py-4">
//             <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
//             <p className="text-gray-700 text-base">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
//             </p>
//           </div>
//           <div className="px-6 pt-4 pb-2">
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
//           </div>
//         </div>
//         <div className="max-w-sm rounded overflow-hidden shadow-lg">
//           <img className="w-full" src={servicesImage} alt="Sunset in the mountains" />
//           <div className="px-6 py-4">
//             <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
//             <p className="text-gray-700 text-base">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
//             </p>
//           </div>
//           <div className="px-6 pt-4 pb-2">
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
//             <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
//           </div>
//         </div>
//         </div>
//       </div>