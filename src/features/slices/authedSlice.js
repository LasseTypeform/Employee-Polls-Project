import { createSlice } from '@reduxjs/toolkit'

const authedSlice = createSlice({
  name: 'Authed',
  initialState: {
    value: false
  },
  reducers: {
    Authed: (state, action) => {
        // console.log('action in auth', action.payload)
      return {
        ...state,
        value : action.payload
      }

    },
  },
})

// Action creators are generated for each case reducer function
export const { Authed } = authedSlice.actions

export default authedSlice.reducer