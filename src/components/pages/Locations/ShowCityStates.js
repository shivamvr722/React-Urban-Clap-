import { useEffect, useState } from "react"
import axios from "axios"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { useDispatch, useSelector } from "react-redux"
import { addState } from "../../../features/stateSlice"
import useFetchData from "../../../Networks/useFetchData"

const ShowStates = () => {
  const { isLoading, apiData, serverError } = useFetchData("state");
  const dispatch = useDispatch()
  if(apiData){
    dispatch(addState(apiData))
  }
  
  const states = useSelector(state => state.stateAction.states)
  const stateMap = states?.map((obj, i) =>{
    return <tr key={obj.id}><td>{obj.state}</td></tr>
  })

    return(
      <div className="servicesCont2">
        <div className="servicesCatContainer">
          <Heading1 name="States" />
          <table>
            <thead>
              <tr>
                <th>State Name</th>
              </tr>
            </thead>
            <tbody>
              {stateMap}
            </tbody>
          </table>
        </div>
      </div>
    )
  // }
}


export default ShowStates