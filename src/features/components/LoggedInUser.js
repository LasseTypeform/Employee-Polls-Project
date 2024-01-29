import React from 'react'
import { useSelector } from 'react-redux'

const LoggedInUser = () => {
  const userChosen = useSelector((state) => state.loggedInUser.value)
  
  return (
    <div className='loggedin-user-container'>

    
      <div className='userChosen flex-column'>
      {
        (Object.values(userChosen).length > 0 && userChosen !== undefined) && ( <div className='flex-column'>
          <div className='flex-column'>
            <img alt="User Avatar" className="avatar" src={userChosen['avatarURL']}/>
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