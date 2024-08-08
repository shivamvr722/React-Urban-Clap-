import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subservices: []
}

export const providedSubServices = createSlice({
  name: "subservices",
  initialState,
  reducers: {
    addSubService: (state, action) => {
      state.subservices = action.payload
    },
  }
})

export const { addSubService } = providedSubServices.actions
export default providedSubServices.reducer