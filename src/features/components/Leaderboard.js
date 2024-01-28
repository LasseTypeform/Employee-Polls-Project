import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

function Leaderboard() {

  const isAuthed = useSelector((state) => state.userAuthed.value)
  const allUsersFromState = useSelector((state) => state.users.value)

  const [sortedUsers, setSortedUsers] = useState([])


  useEffect(() => {

    let usersSorted = false

    if (Object.values(allUsersFromState).length > 0) {
      // Calculate the total number of questions and answers for each user
      const userScores = allUsersFromState.map(user => ({
        ...user,
        score: user.questions.length + Object.keys(user.answers).length
      }));

      // Sort the users in descending order based on their scores
      const tempsortedUsers = userScores.sort((a, b) => b.score - a.score);

      setSortedUsers(tempsortedUsers)
    }

    return () => {
      usersSorted = true
    }

  }, [])



  return (

    <div>
      {isAuthed ? (

        (Object.values(allUsersFromState).length > 0) ?
          (<div><h1>
            Leaderboard
          </h1>
            <table>
              <thead>
                <tr>
                  <th>Users 1 </th>
                  <th>Questions Asked </th>
                  <th>Questions Answered</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.length > 0 &&
                  sortedUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <img src={user.avatarURL} alt={`Avatar of ${user.name}`} />
                      </td>
                      <td>
                        <p>{user.name}</p>
                      </td>
                      <td>
                        <p>Asked: {user.questions.length}</p>
                      </td>
                      <td>
                        <p>Answered: {Object.keys(user.answers).length}</p>
                      </td>
                      <td>
                        <p>Score: {user.score}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

          </div>) :
          (
            <div><h1>
              Leaderboard
            </h1>
              <table>
                <thead>
                  <tr>
                    <th>Users</th>
                    <th>Questions Asked</th>
                    <th>Questions Answered</th>
                  </tr>
                </thead>
              </table>
            </div>
          )

      ) : (<Navigate to="/login" replace={true} />)}
    </div>
  )
}

export default Leaderboard