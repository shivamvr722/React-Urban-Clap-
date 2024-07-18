import { configureStore } from '@reduxjs/toolkit'
import newPasswordTokenReducer from "../features/authenticationSlice"
import userProfileReducer from "../features/usersSlice"
import usersList from "../features/listUserSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
//   // Specify the reducers you want to persist
//   whitelist: ['userProfileReducer'], // In this example, we persist the 'user' reducer
// };

export const store = configureStore({
  reducer: {
    newPassworeToken: newPasswordTokenReducer,
    userProfileActions: userProfileReducer,
    usersListAction: usersList
    // comments: commentsReducer,
    // users: usersReducer,
  },
})


// const persistedReducer = persistReducer(persistConfig, rootReducer);
