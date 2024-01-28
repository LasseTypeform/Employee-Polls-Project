import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'User',
  initialState: {
    value: {}
  },
  reducers: {
    AllUser: (state, action) => {
      return {
        ...state,
        value: action.payload
      }
    },
    questionAddedByUser: (state, action) => {


      return {
        value: action.payload
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { AllUser, questionAddedByUser } = usersSlice.actions

export default usersSlice.reducer