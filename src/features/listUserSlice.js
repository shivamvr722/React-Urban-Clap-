import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    "id": "",
    "first_name": "",
    "last_name": "",
    "email": "",
    "contact_number": "",
    "profile": "",
    "user_type": ""
  }
}

export const usersListsSlice = createSlice({
  name: "userdetailslist",
  initialState,
  reducers: {
    addUserList: (state, action) => {
      state.users = action.payload
    },
  }
})

export const { addUserList } = usersListsSlice.actions
export default usersListsSlice.reducer

