import React from 'react'
import { useSelector } from 'react-redux'

const LoggedInUser = () => {
  const userChosen = useSelector((state) => state.loggedInUser.value)
  
  return (
    <div className='loggedin-user-container'>

    
      <div className='userChosen'>
      {
        (Object.values(userChosen).length > 0 && userChosen !== undefined) && ( <div>
          <div >
            <img alt="User Avatar" src={userChosen['avatarURL']}/>
          </div>
          <div>
            <p>Name: {userChosen['name']}</p>
          </div>
        </div> )
      }
      </div>
    </div>
  )
}

export default LoggedInUser