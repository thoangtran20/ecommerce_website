import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn')
    ? localStorage.getItem('isLoggedIn')
    : false,
  email: localStorage.getItem('email') ? localStorage.getItem('email') : null,
  userName: localStorage.getItem('userName')
    ? localStorage.getItem('userName')
    : null,
  userID: localStorage.getItem('userID')
    ? localStorage.getItem('userID')
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload)
      const { email, userName, userID } = action.payload
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', state.isLoggedIn)
      state.email = email
      localStorage.setItem('email', state.email)

      state.userName = userName
      localStorage.setItem('userName', state.userName)

      state.userID = userID
      localStorage.setItem('userID', state.userID)
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false
      localStorage.removeItem('isLoggedIn')
      state.email = null
      localStorage.removeItem('email')

      state.userName = null
      localStorage.removeItem('userName')

      state.userID = null
      localStorage.removeItem('userID')
    },
  },
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn

export const selectEmail = function (state) {
  console.log(state.auth)
  return state.auth.email
}
export const selectUserName = (state) => state.auth.userName
export const selectUserID = (state) => state.auth.userID

export const authReducer = authSlice.reducer
