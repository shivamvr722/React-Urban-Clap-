import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  states:[]
}

export const providedStates = createSlice({
  name: "states",
  initialState,
  reducers: {
    addState: (state, action) => {
      state.states = action.payload
    },
  }
})

export const { addState } = providedStates.actions
export default providedStates.reducer