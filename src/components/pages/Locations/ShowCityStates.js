import { useEffect, useState } from "react"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import {  useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { addState } from "../../../features/stateSlice"

const ShowStates = () => {
  const dispatch = useDispatch()
  const states = useSelector(state => state.stateAction.states)
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const uType = currentUser.user_type.toLowerCase()

  const handleActivation = async (id, state, status) => {
    const URL = `http://127.0.0.1:8000/urban-company/state/${id}/`
    try{
      const putValue = {"state_status": status}
      const resposne = await axios.patch(URL, putValue, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      const data = await resposne.data
      dispatch(addState(states.map((obj, i)=> obj?.id === id ? {...obj, state_status: data.state_status} : obj )))
    } catch (error) {
      console.log(error.resposne.data)
    }    
  }

  const stateMap = states?.map((obj, i) =>{
    return <tr key={obj.id}><td>{obj.state}</td><td style={obj.state_status === "active" ? {color:"green"} : {color:"red"}}>{obj.state_status}</td>{uType === "superadmin" && <td><span className="btnspan" onClick={() => handleActivation(obj.id, obj.state, obj.state_status === "active" ? "inactive" : "active")}>{obj.state_status === "active" ? "Disable" :  "Enable"}</span></td>}</tr>
  })

  return(
    <div className="addservicecontainer">
      <div className="servicesCatContainer">
        <Heading1 name="States" />
        <table>
          <thead>
            <tr>
              <th>State Name</th>
              <th>Status</th>
              {uType === "superadmin" && <th colSpan={2}>Active/InActive</th>}
            </tr>
          </thead>
          <tbody>
            {stateMap}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default ShowStates