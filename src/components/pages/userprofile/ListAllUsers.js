import axios from "axios"
import { useEffect, useState } from "react"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import "./listAllUser.css"
import { Link, useNavigate } from "react-router-dom"
import profileDefault from "../../../assets/userprofileDefault.png"
// import { addUserList } from "../../../features/listUserSlice"

const ListAllUsers = () => {
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const [intialUserData, setInitialUserData] = useState("")
  const [userData, setUserData] = useState("")
  const [filterUser, setFilterUser] = useState("")
  const [userCategory, setUserCategory] = useState("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("")

  const dispatch = useDispatch()
  
  // for pagination
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);
  let profileImage =  `http://localhost:8000:null`;
  if (profileImage.split("8000")[1] !== "null") {
    profileImage = `http://localhost:8000${userData.profile}`;
  } else {
    profileImage = profileDefault;
  }
  
  const users = async () => {
    setLoading(true);
    try{
      const response = await axios.get("http://localhost:8000/urban-company/userprofiles/", {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})      // dispatch(addUserList(response.data))
      setInitialUserData(response?.data)
      setUserData(response?.data)
      setLoading(false);
    } catch (error){
      setLoading(false);
      console.log(error)
    }
  }
  
  useEffect(() => {
    users()
  }, [])
    
  
  // for filter the search
  useEffect(() => {
    let usersFiltered = null
    if(filterUser || userCategory){
      if (userCategory){
        usersFiltered = intialUserData.filter((user, i )=> (userCategory.toLowerCase() === user.user_type.toLowerCase()) && (user.first_name.includes(filterUser.toLowerCase()) || user.last_name.includes(filterUser.toLowerCase()) || user.email.includes(filterUser.toLowerCase())))  
      } else {
        usersFiltered = intialUserData.filter((user, i )=> user.first_name.includes(filterUser.toLowerCase()) || user.last_name.includes(filterUser.toLowerCase()) || user.email.includes(filterUser.toLowerCase()))
      }
      if(!usersFiltered.length){
        return 
      }
      setUserData(usersFiltered)
     } else {
      setUserData(intialUserData)
    }
  }, [filterUser, userCategory])
  // filter ends

  if (userData){ 

    let allUsers = userData?.map((user, i) => {
      return(
        <tr key={user.id}>
          <td>{i+1}</td>
          <td>
            {
              <a href={"http://localhost:8000" + user.profile} target="_blank">
              <img className="profileImage" src={user.profile ? "http://localhost:8000" + user.profile : profileDefault} alt="profile" width={100} height={100}/>
              </a>
            }
          </td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td>{user.contact_number}</td>
          <td>{user.user_type}</td>
          <td>{user.id}</td>
          <td>
            <Link to={"/profile"} className="viewUpdateLink" state={{ userli: user }}>View/Update</Link>
          </td>
        </tr>
      )
    })

    const theading = ["Index", "Profile Image", "First Name", "Last Name", "Email", "Contact", "User Type", "User id", "Update/View"]
    const heading = theading.map((head, i)=>{
      return <th key={head}>{head}</th>
    })

    // const handlePagination = (pageNumber) => {
    //   setCurrentPage(pageNumber);
    // };

    return(
      <>
      <NavigationBar />
      {loading && <h1 className="loading">Loading...</h1>}
      <div className="search">
        <input type="text" id="search" placeholder="Search here..." onChange={(e) => setFilterUser(e.target.value)} value={filterUser} />
        <select onChange={(e)=> setUserCategory(e.target.value)}>
          <option value={''}>All User</option>
          <option value={"ServiceProvider"}>Service Provider</option>
          <option value={"user"}>User</option>
          <option value={"SuperAdmin"}>Super Admin</option>
        </select>
      </div>
      <table className="tableUList">
        <thead className="theadList">
          <tr>
          {heading}
          </tr>
        </thead>
        <tbody className="tbodyList">
          {allUsers}
        </tbody>
      </table>
      {/* <Pagination
        length={intialUserData.length}
        currentPage={currentPage}
        dataPerPage={postsPerPage}
        handlePagination={handlePagination}
      /> */}
      </>
    )
  }
  
}

export default ListAllUsers