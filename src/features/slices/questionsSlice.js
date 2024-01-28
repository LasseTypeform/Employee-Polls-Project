import { createSlice } from '@reduxjs/toolkit'

const questionSlice = createSlice({
  name: 'Questions',
  initialState: {
    value: {}
  },
  reducers: {
    AllQuestions: (state, action) => {
      return {
        ...state,
        value: action.payload
      }
    },
    questionAdded: (state, action) => {
      
      state.value.push(action.payload)
      
    },
    updateAnswerInQuestions: (state, action) => {
      
      return {
        ...state,
        value: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { AllQuestions, questionAdded, updateAnswerInQuestions } = questionSlice.actions

export default questionSlice.reducer


