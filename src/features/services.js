import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users:{
    "id": "",
    "service_type" :""
  }
}

export const providedServices = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action) => {
      state.users = action.payload
    },
  }
})

export const { addService } = providedServices.actions
export default providedServices.reducer

