import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import {  useSelector, useDispatch } from "react-redux"
import { addState, sortState } from "../../../features/stateSlice"
import usePatchData from "../../../Networks/usePatchData"
import TableHead from "../../subcomponents/HeadingCoponets/TableHead"
import { useEffect, useState } from "react"
import useFetchData from "../../../Networks/useFetchData"
import { CategoryScale } from "chart.js"

const ShowStates = () => {
  const dispatch = useDispatch()
  const { isLoading, dataFetch } = useFetchData();
  const { isLoadingPatch, patchData } = usePatchData();
  const [orderField, setOrderField] = useState("")
  const [searchField, setSearchField] = useState("")
  const [filterField, setFilterField] = useState("")
  const states = useSelector(state => state.stateAction.states)
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const uType = currentUser.user_type.toLowerCase()

  const handleActivation = async (id, state, status) => {
    const URL = `state/${id}`
    try{
      const putValue = {"state_status": status}
      const apiData = await patchData(URL, putValue)
      const data = await apiData?.data
      dispatch(addState(states.map((obj, i)=> obj?.id === id ? {...obj, state_status: data.state_status} : obj )))
    } catch (error) {
      console.log(error.resposne.data)
    }    
  }

  const fetchStates = async () => {
    const URL = `state/?ordering=${orderField}&search=${searchField}&state_status__iexact=${filterField}`
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      dispatch(addState(apiData?.data))
    }
  }

  useEffect(
    () => {fetchStates()}
  ,[orderField, searchField, filterField])

  const tname = ["state", "state_status"]
  const ttname = ["State", "Status"]
  const heads = tname.map((field, i) => {
    return <TableHead key={i} name={field} titleName={ttname[i]} orderField={orderField} setOrderField={setOrderField} />
  })

  const stateMap = states?.map((obj, i) =>{
    return <tr key={obj.id}><td>{obj.state}</td><td style={obj.state_status === "active" ? {color:"green"} : {color:"red"}}>{obj.state_status}</td>{uType === "superadmin" && <td><span className="btnspan" onClick={() => handleActivation(obj.id, obj.state, obj.state_status === "active" ? "inactive" : "active")}>{obj.state_status === "active" ? "Disable" :  "Enable"}</span></td>}</tr>
  })

  return(
    <div className="servicesCatContainer">
      <Heading1 name="States" />
      <input type="text" id="search" placeholder="Search here..." onChange={(e) => setSearchField(e.target.value)} value={searchField} />
      <select onChange={(e)=> setFilterField(e.target.value)} className="selectbox" name='city_status__iexact'>
        <option value={''}>Filter By</option>
        <option value={"active"}>Active</option>
        <option value={"inactive"}>Inactive</option>
      </select>
      <table>
        <thead>
          <tr>
            {heads}
            {uType === "superadmin" && <th colSpan={2}>Active/InActive</th>}
          </tr>
        </thead>
        <tbody>
          {stateMap?.length ? stateMap : <tr><td colSpan={4}>NO Data Found : (</td></tr> }
        </tbody>
      </table>
    </div>
  )
}


export default ShowStates