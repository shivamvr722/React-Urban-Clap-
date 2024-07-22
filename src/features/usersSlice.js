import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  "user":{
    "id": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "contact_number": "",
    "profile" : "",
    "user_type": ""
  }
}

export const usersSlice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload
    }
  }
})



export const { addUser } = usersSlice.actions
export default usersSlice.reducer

