import { createSlice } from '@reduxjs/toolkit'

const answersSlice = createSlice({
  name: 'Answers',
  initialState: {
    value: {}
  },
  reducers: {
    AllAnswers: (state, action) => {
      return {
        ...state,
        value : action.payload
      }
    },
    updateAnswer: (state, action) => {
      return state.questions.value = state.questions.value.map((question) => 
        question['id'] === action.payload.id ? action.payload : question
      )
    }
  },
})

// Action creators are generated for each case reducer function
export const { AllAnswers, updateAnswer } = answersSlice.actions

export default answersSlice.reducer