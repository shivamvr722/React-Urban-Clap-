import { createSlice } from "@reduxjs/toolkit";

const initialCities = {
  cities:[]
}

export const cityProivided = createSlice({
  name: "cities",
  initialCities,
  reducers: {
    addCities: (state, action) => {
      state.cities = action.payload
    },
  }
})

export const { addCity } = cityProivided.actions
export default cityProivided.reducer
