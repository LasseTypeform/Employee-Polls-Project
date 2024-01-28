import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginCheck } from '../../utils/api'
import { SetLoggedInUser } from '../slices/loginSlice'
import { Authed } from '../slices/authedSlice'


function LoginForm() {

  const isAuthed = useSelector((state) => state.userAuthed.value)

  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    userID: '',
    password: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const { userID, password } = formState


    if (userID === '' || password === '') {
      return alert('Please fill in both fields')
    } else {
      try {
        const response = await loginCheck(formState)

        if ((response) !== undefined || (response) !== 'string') {
          dispatch(SetLoggedInUser(response[0]))
          dispatch(Authed(true))
        } else alert(`User with those credentials does Not exists`)

      }
      catch (error) {
        alert(`User with those credentials does Not exists`)
      }
    }

  }

  return (
    <div>
      {isAuthed ? (
        <Navigate to="/" replace={true} />
      )
        :
        (<form name="loginForm" onSubmit={onSubmit}>

          <h3>Log in with your credentials:</h3>
          <div className="row">

            <div className="col-sm-3 col-md-6">
              <label htmlFor="userID">UserID</label>
            </div>

            <div className="col-sm-9 col-md-6">
              <input
                type="text"
                name="userID"
                onChange={(e) => setFormState({ ...formState, userID: e.target.value })}
                // onChange={(e)=> setUserIDState(e.target.value)} 
                value={formState.userID}
                placeholder="User Id"
              />
            </div>

            <div className="col-sm-3 col-md-6">
              <label htmlFor="password">Password</label>
            </div>
            <div className="col-sm-9 col-md-6">
              <input
                type="text"
                name="password"
                onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                value={formState.password}
                placeholder="admin"
              />
            </div>

            <div className="col-sm-3 col-md-6">
            </div>
            <div className="col-sm-9 col-md-6">
              <input className="primary" type="submit" value="Login" />
            </div>

          </div>

        </form>)}
    </div>
  )
}

export default LoginForm