import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  passwordToken: "",
  accessToken: "",
}

export const  confirmPasswordSlice = createSlice({
  name:"setpasswordtoken",
  initialState: initialState,
  reducers:{
    setAuthAcessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setNewPasswordToken: (state, action) => {
      state.passwordToken = action.payload
    },
  }
})

export const { setNewPasswordToken, setAuthAcessToken } = confirmPasswordSlice.actions
export default confirmPasswordSlice.reducer