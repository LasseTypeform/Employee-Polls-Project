import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'LoggedInUser',
  initialState: {
    value: {}
  },
  reducers: {
    SetLoggedInUser: (state, action) => {

      return {
        ...state,
        value : action.payload
      }
    },
    removedLoggedInUser: (state) => {

      return{
        ...state,
        value : {}
      }

    },
    UpdateLoggedInUser: (state, action) => {

      return {
        value: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { SetLoggedInUser, removedLoggedInUser, UpdateLoggedInUser } = loginSlice.actions

export default loginSlice.reducer