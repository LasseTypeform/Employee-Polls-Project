import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from "react-router-dom";
import Polls from './Polls'
import LoggedInUser from './LoggedInUser'
import { getInitialQuestions, getUsers } from '../../utils/api'
import { AllQuestions } from '../slices/questionsSlice'
import { AllUser } from '../slices/usersSlice'

import LoadingBar from "react-redux-loading-bar";

function Home() {

    const dispatch = useDispatch()
    const signedInUser = useSelector((state) => state.loggedInUser.value)
    const isAuthed = useSelector((state) => state.userAuthed.value)
    const count = useSelector((state) => state.counter.value)
    const questionsFromState = useSelector((state) => state.questions.value)


    const [answeredQuestions, setAnsweredQuestions] = useState([])
    const [unAnsweredQuestions, setUnAnsweredQuestions] = useState([])

    function compareQuestions(dataArray) {
        
        let tempTrue = []
        let tempFalse = []

        if ((dataArray).length > 0 && Object.values(signedInUser['answers']).length > 0) {

            let usersQs = Object.keys(signedInUser['answers'])

            dataArray.forEach((q) => {

                if (usersQs !== undefined) {
                    (usersQs.includes(q['id'])) ? tempTrue.push(q) : tempFalse.push(q)
                }
            })
            setCheckedQuestions(tempTrue, tempFalse)
        }
    }

    function setCheckedQuestions(tempTrue, tempFalse) {
    
        setAnsweredQuestions(tempTrue)
        setUnAnsweredQuestions(tempFalse)
    }

    async function fetchUsersData() {
        try {
          const users = await getUsers()  
          dispatch(AllUser(users))
        }
        catch (error) {
          console.log('Catch error in Apps.js UseEffect =>', error.message)
        }
      }

    useEffect(() => {

        let questionsRetrieved = false

        if (isAuthed) {
            
            if (!questionsRetrieved) {

                if (count === 0) {

                    (async () => {
                        try {
                            const data = await getInitialQuestions()
                            
                            if (data !== undefined) {
                                const dataArray = data
                                
                                dispatch(AllQuestions(dataArray))
                                compareQuestions(dataArray)
                                fetchUsersData()
                            }

                        }
                        catch (error) {
                            console.log('error message from catch => ', error.message)
                        }
                    })();
                } else if (questionsFromState !== undefined){
                    compareQuestions(questionsFromState)
                }
                return () => {
                    questionsRetrieved = true
                }
            }
        }

    }, [count])


    return (
        <div className='home-page'>
            <LoadingBar style={{ backgroundColor: 'blue', height: '10px' }} />
            <h3>React Redux Employee Polls Project</h3>

            {isAuthed ? (
                <LoggedInUser />
            ) : (<Navigate to="/login" replace={true} />)}

            {unAnsweredQuestions.length > 0 && (<Polls questions={unAnsweredQuestions} title={'New Questions'}
            />)}


            {answeredQuestions.length > 0 && (<Polls questions={answeredQuestions} title={'Done'} />)}

        </div>
    )
}


export default Home