import { configureStore } from '@reduxjs/toolkit'
import newPasswordTokenReducer from "../features/authenticationSlice"
import userProfileReducer from "../features/usersSlice"
import usersList from "../features/listUserSlice"
import services from '../features/services'
import subServices from '../features/subServices'
import states from '../features/stateSlice'
import cities from "../features/citySlice"


export const store = configureStore({
  reducer: {
    newPassworeToken: newPasswordTokenReducer,
    userProfileActions: userProfileReducer,
    usersListAction: usersList,
    servicesActions: services,
    subServiceAction: subServices,
    stateAction: states,
  },  
})



