import React from 'react'
import { useDispatch } from 'react-redux'

import { Authed } from '../slices/authedSlice'
import { removedLoggedInUser } from '../slices/loginSlice'



function LogOutButton() {
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => {
        dispatch(Authed(false))
        dispatch(removedLoggedInUser())
      }}>Log out</button>
    </div>
  )
}

export default LogOutButton