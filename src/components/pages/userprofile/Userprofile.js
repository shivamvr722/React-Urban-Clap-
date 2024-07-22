import axios from "axios"
import { useEffect, useState } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import "./userprofile.css"
import { useSelector, useDispatch } from "react-redux"
import { addUser } from "../../../features/usersSlice"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import Button from "../../subcomponents/FormComponets/Button"
import DesplayUserDetail from "./DisplayUserDetails"
import { Form, useLocation, useNavigate } from "react-router-dom"
import UpdateDetails from "./UpdateDetails"
import profileDefault from "../../../assets/userprofileDefault.png"
import UploadProfileImage from "./UpdateProfileImage"




const UserprofileShow = () => {
  const [update, setUpdate] = useState(false)
  const [updateImage, setUpdateImage] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation();
  
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}userprofile/`, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
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
  
  useEffect(
    () => {
      fetchProfile()
    }, [])
  
  let aState = false
  let userData = useSelector((state)=> state.userProfileActions.user);
  let currentUser = userData
  if (state?.userli?.id){
    // we get data as state using the Link from the all user list
    userData = state?.userli
    aState = true
  } else if (state?.updatedUser?.id) {
    // it will send the from the update where the navigate pass data through state
    // so i can update profile same profile again and again
    userData = state?.updatedUser
    aState = true
  }
  
  let profileImage = `http://localhost:8000${userData.profile}`;
  if (profileImage.split("8000")[1] !== "null") {
    profileImage = `http://localhost:8000${userData.profile}`;
  } else {
    profileImage = profileDefault;
  }
 



  return(
    <>
    <div className="userdivcontainer">
      <Heading1 name={"User Profile"} />
      <div className="usercontentcontainer">
        <div className="sidebar1">
          <div>
            <p className="userS1">User</p>
            <div className="profileImage">
              <a href={profileImage} target="_blank"><img src={profileImage} /></a>
                {updateImage && <UploadProfileImage />}
                {!updateImage ? <Button name="Edit" handleAction={() => {setUpdateImage(!updateImage)}} /> : <Button name="Hide" handleAction={() => {setUpdateImage(!updateImage)}} />}
              <a href={profileImage} target="_blank"><Button name="View" /></a>
            </div>
          </div>
          <div className="usernameS1">
          <center>
            <span>{userData.first_name}&nbsp;&nbsp;</span>
            <span>{userData.last_name}</span>
          </center>
          </div>
        </div>
        <div className="sidebar2">
          <h3>User Details</h3>
            <div className="detailD1">
              {!update ? 
              <>
              <DesplayUserDetail name={"First Name"} value={userData.first_name} />
              <DesplayUserDetail name={"Last Name"} value={userData.last_name} />
              <DesplayUserDetail name={"Email"} value={userData.email} />
              <DesplayUserDetail name={"Contact"} value={userData.contact_number} />
              {(currentUser.user_type.toLowerCase() === "superadmin") && <DesplayUserDetail name={"User Type"} value={userData.user_type} />}
              </>
              :
              <UpdateDetails update={update} setUpdate={setUpdate} data={userData} aState={aState} />
              }
            </div>
            <div>
            {!update && 
            <>
              <Button name={"Edit"} handleAction={() => {setUpdate(!update)}}/>
              <Button name={"Home"} handleAction={() => navigate("/")}/>
            </>
            }
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default UserprofileShow