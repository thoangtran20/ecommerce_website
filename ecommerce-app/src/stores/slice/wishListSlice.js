import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishListItems: localStorage.getItem('wistListItem')
    ? JSON.parse(localStorage.getItem('wistListItem'))
    : [],
}

const wishListSlice = createSlice({
  name: 'wishListItems',
  initialState,
  reducers: {},
})

export const {} = wishListSlice.actions

export const wishListReducer = wishListSlice.reducer
