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
    },

    updateUser: (state, action) => {

    },
    deleleUser: (state, action) => {

    },
    updateProfileImage: (state, action) => {
      
    },
    removeProfileImage: (state, action) => {

    }
  }
})



export const { addUser, updateUser, deleleUser, updateProfileImage, removeProfileImage } = usersSlice.actions
export default usersSlice.reducer

