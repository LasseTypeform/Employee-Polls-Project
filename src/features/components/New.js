import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { questionAdded } from '../slices/questionsSlice'
import { saveNewQuestion, updateUsersQuestionsArray } from '../../utils/api'
import { questionAddedByUser } from '../slices/usersSlice'
import { incremented } from '../slices/counterSlice'
import { UpdateLoggedInUser } from '../slices/loginSlice'

import { Navigate } from "react-router-dom";

function New() {
    const dispatch = useDispatch()
    const signedInUser = useSelector((state) => state.loggedInUser.value['id'])
    const isAuthed = useSelector((state) => state.userAuthed.value)
    const existingUsers = useSelector((state) => state.users.value)
    const existingUser = useSelector((state) => state.loggedInUser.value)

    const author = signedInUser
    const [optionTextOne, setOptionTextOne] = useState('')
    const [optionTextTwo, setOptionTextTwo] = useState('')

    const [goToHomePage, setGoToHomePage] = useState(false)

    if (goToHomePage) {
        return <Navigate to='/' />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const questionDataToBeSaved = {
            "author": author,
            "optionTextOne": optionTextOne,
            "optionTextTwo": optionTextTwo
        }

        try {

            const savedquestion = await saveNewQuestion(questionDataToBeSaved)

            if (savedquestion !== undefined) {
                let questionId = savedquestion['id']


                dispatch(questionAdded(savedquestion))

                let updatedUsersArray = updateUsersQuestionsArray({ questionId: questionId, users: existingUsers, existingUser: existingUser })
                dispatch(questionAddedByUser(updatedUsersArray));

                let updatedLoggedinUser = updatedUsersArray.filter((u) => u['id'] === existingUser['id'])

                dispatch(UpdateLoggedInUser(updatedLoggedinUser[0]))
                dispatch(incremented())
                setOptionTextOne('')
                setOptionTextTwo('')
                setGoToHomePage(true)
            }
        } catch (error) {
            console.log('error in savedquestion', error)
        }

    }

    const handleChangeoptionTextOne = (e) => {
        const text = e.target.value;
        setOptionTextOne(text);


    }
    const handleChangeoptionTextTwo = (e) => {
        const text = e.target.value;
        setOptionTextTwo(text);
    }

    return (
        <div className='NewPage'>
            {isAuthed ? (
                <div>
                    <h3>Create Your Own Poll</h3>
                    <h4>Would You Rather</h4>

                    <form className='new-question-form' onSubmit={handleSubmit}>
                        <label>
                            First Option:
                            <input type="text" name="first-optionText" value={optionTextOne} onChange={handleChangeoptionTextOne} />
                        </label>

                        <label>
                            Second Option:
                            <input type="text" name="second-optionText" value={optionTextTwo} onChange={handleChangeoptionTextTwo} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form> </div>) : (<Navigate to="/login" replace={true} />
            )

            }
        </div>
    )
}

export default New