import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'Counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value = 0
    }
  }
})

export const { incremented, decremented } = counterSlice.actions

export default counterSlice.reducer
