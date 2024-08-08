import { useEffect, useState } from "react"
import NavigationBar from "../../subcomponents/Header/navbar/Navbar"
import { useDispatch, useSelector } from "react-redux"
import "./listAllUser.css"
import { Link, useNavigate } from "react-router-dom"
import profileDefault from "../../../assets/userprofileDefault.png"
import useFetchData from "../../../Networks/useFetchData"
import TableHead from "../../subcomponents/HeadingCoponets/TableHead"

const ListAllUsers = () => {
  const {isLoading, dataFetch} = useFetchData();
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const [intialUserData, setInitialUserData] = useState("")
  const [userData, setUserData] = useState("")
  const [filterUser, setFilterUser] = useState("")
  const [searchField, setSearchField] = useState("")
  const [orderField, setOrderField] = useState("")
  const [userCategory, setUserCategory] = useState("")
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);


  

  // for profile image
  let profileImage =  `http://localhost:8000:null`;
  if (profileImage.split("8000")[1] !== "null") {
    profileImage = `http://localhost:8000${userData.profile}`;
  } else {
    profileImage = profileDefault;  
  }
  

  // for fetching the users
  const users = async () => {
    const URL = `userprofiles/?p=${page}&search=${searchField}&ordering=${orderField}&user_type__iexact=${userCategory}`;
    const apiData = await dataFetch(URL);
    if (apiData?.success) {
      setInitialUserData(apiData?.data)
      setUserData(apiData?.data)
      setLoading(false);
    } else if (!apiData?.success){
      setLoading(false);
    }
  }
  

  useEffect(() => {
    // const callApi = setTimeout(() => {
      users()
    // }, 500)
    // return () => clearTimeout(callApi)

  }, [page, filterUser, searchField, orderField, userCategory, setPage])
    

  
  if (userData){ 
    console.log(userData);
    let allUsers = userData?.results?.map((user, i) => {
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

  
    const tname = ["first_name", "last_name", "email", "contact_number", "user_type", "id"]
    const ttname = ["First Name", "Last Name", "Email", "Contact", "User Type", "User id"]
    const heads = tname.map((field, i) => {
      return <TableHead name={field} titleName={ttname[i]}  key={i} orderField={orderField} setOrderField={setOrderField} />
    })

    return(
      <>
      <NavigationBar />
      {loading && <h1 className="loading">Loading...</h1>}
      <div className="search">
        <input type="text" id="search" placeholder="Search here..." onChange={(e) => setSearchField(e.target.value)} value={searchField} />
        <select onChange={(e)=> setUserCategory(e.target.value)} className="selectbox" name='user_type__iexact'>
          <option value={''}>All User</option>
          <option value={"ServiceProvider"}>Service Provider</option>
          <option value={"user"}>User</option>
          <option value={"SuperAdmin"}>Super Admin</option>
        </select>
      </div>
      <table className="tableUList">
        <thead className="theadList">
          <tr>
            <th> Index </th>
            <th> Profile Image </th>
            {heads}
            <th>Update/View</th>
          </tr>
        </thead>
        <tbody className="tbodyList">
          {allUsers.length ? allUsers : <tr className="w-full"><td className="p-4 font-[900]" colSpan={9}>No Data Available : ( </td></tr>}
        </tbody>
      </table>
      <div>
        <p>{userData?.previous && <><span className="btnPagination" onClick={() => { setPage( 1 )}}>First</span><span className="btnPagination" onClick={() => { setPage( page - 1 )}}>Prev</span></>}<span className="currentPage">{page}</span>{userData?.next && <><span className="btnPagination" onClick={() => { setPage( page + 1 )} }>Next</span><span className="btnPagination" onClick={() => { setPage( Math.ceil(userData.count/10) )}}>Last</span></> }<span className="currentPage">({userData?.results?.length} / {userData.count})</span></p>
      </div>
      </>
    )
  }
}

export default ListAllUsers


// for filter the search
  // useEffect(() => {
  //   let usersFiltered = null
  //   if(filterUser || userCategory){
  //     if (userCategory){
  //       usersFiltered = intialUserData.filter((user, i )=> (userCategory.toLowerCase() === user.user_type.toLowerCase()) && (user.first_name.includes(filterUser.toLowerCase()) || user.last_name.includes(filterUser.toLowerCase()) || user.email.includes(filterUser.toLowerCase())))  
  //     } else {
  //       usersFiltered = intialUserData.filter((user, i )=> user.first_name.includes(filterUser.toLowerCase()) || user.last_name.includes(filterUser.toLowerCase()) || user.email.includes(filterUser.toLowerCase()))
  //     }
  //     if(!usersFiltered.length){
  //       return 
  //     }
  //     setUserData(usersFiltered)
  //    } else {
  //     setUserData(intialUserData)
  //   }
  // }, [filterUser, userCategory])