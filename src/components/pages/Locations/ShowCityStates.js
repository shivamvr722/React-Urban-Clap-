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


    return(
      <div className="servicesCont">
        <div className="servicesCatContainer">
          <Heading1 name="Sub Services" />
        </div>
      </div>
    )
  // }
}


export default ShowStates