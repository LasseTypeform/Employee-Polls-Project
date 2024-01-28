import { configureStore } from '@reduxjs/toolkit'
import { loadingBarReducer } from 'react-redux-loading-bar'
import loginSlice from './features/slices/loginSlice'
import authedSlice from './features/slices/authedSlice'
import usersSlice from './features/slices/usersSlice'
import questionSlice from './features/slices/questionsSlice'
import counterSlice from './features/slices/counterSlice'


export default configureStore({
  reducer: {
    counter: counterSlice,
    userAuthed: authedSlice,
    loggedInUser: loginSlice,
    loadingBar: loadingBarReducer,
    users: usersSlice,
    questions: questionSlice,
  }
})