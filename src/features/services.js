import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: {
    "id": "",
    "service_type": ""
  }
}

export const providedServices = createSlice({
  name: "services",
  initialState,
  reducers: {
    addService: (state, action) => {
      state.services = action.payload
    },
  }
})

export const { addService } = providedServices.actions
export default providedServices.reducer

