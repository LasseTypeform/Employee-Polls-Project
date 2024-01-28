import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveNewAnswer, updateUsersAnswerArray } from '../../utils/api'
import { updateAnswerInQuestions } from '../slices/questionsSlice'
import { incremented } from '../slices/counterSlice'
import { AllUser } from '../slices/usersSlice'
import { SetLoggedInUser } from '../slices/loginSlice'
import { Navigate } from "react-router-dom";

function Question() {

    const dispatch = useDispatch()
    const params = useParams();
    const signedInUser = useSelector((state) => state.loggedInUser.value)
    const isAuthed = useSelector((state) => state.userAuthed.value)
    const QuestionsFromState = useSelector((state) => state.questions.value)
    const allUsersFromState = useSelector((state) => state.users.value)



    const [questionChosen, setQuestionChosen] = useState({})

    const [goToHomePage, setGoToHomePage] = useState(false)




    useEffect(() => {

        let questionChecked = false

        if (QuestionsFromState !== undefined && QuestionsFromState.length > 0) {

            (async () => {
                
                try {
                    let checkedquestion = QuestionsFromState.find(q =>
                        (q['id'] === params['id'])
                    )
                    setQuestionChosen(checkedquestion)
                }
                catch (error) {
                }
            })();
        }

        return () => (questionChecked = true)
    }, [])

    if (goToHomePage) {
        return <Navigate to='/' />
    }


    async function updateQuestionAnswers(dataTobeSaved) {
        let user = dataTobeSaved['loggedInUser']['id']

        let tempArray = questionChosen['optionOne']['votes'].map(u => u)
        tempArray.push(user)

        let isQuestionSaved = false

        let answerValue = dataTobeSaved['answer']
        try {
            let data = await saveNewAnswer(dataTobeSaved)

            if (data) (isQuestionSaved = true)
        } catch (error) {

        }

        if (isQuestionSaved === true && !questionChosen[answerValue]['votes'].includes(dataTobeSaved['loggedInUser']['id'])) {

            if (answerValue === 'optionOne') {
                let newObj1 = {
                    id: questionChosen['id'],
                    author: questionChosen['author'],
                    timestamp: questionChosen['timestamp'],
                    optionOne: {
                        votes: tempArray,
                        text: questionChosen['optionOne']['text'],
                    },
                    optionTwo: {
                        votes: questionChosen['optionTwo']['votes'],
                        text: questionChosen['optionTwo']['text']
                    }
                }

                dispatch(incremented())
                return newObj1
            } else if (answerValue === 'optionTwo') {
                let newObj2 = {
                    id: questionChosen['id'],
                    author: questionChosen['author'],
                    timestamp: questionChosen['timestamp'],
                    optionOne: {
                        votes: questionChosen['optionOne']['votes'],
                        text: questionChosen['optionOne']['text'],
                    },
                    optionTwo: {
                        votes: tempArray,
                        text: questionChosen['optionTwo']['text']
                    }
                }
                dispatch(incremented())
                return newObj2
            }
        }
    }

    function UpdateQuestionsArray(data) {

        const updatedQuestionArray =
            QuestionsFromState.map((question) =>
                question['id'] === data['id'] ? data : question
            )

        return dispatch(updateAnswerInQuestions(updatedQuestionArray))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const answerDataToBeSaved = {
            'loggedInUser': signedInUser,
            'qid': e.target.name,
            'answer': e.target.value,
        }

        // Updating Question answers
        let data = await updateQuestionAnswers(answerDataToBeSaved)

        UpdateQuestionsArray(data)

        // Updating users answer array 
        let updatedUsers = updateUsersAnswerArray(questionChosen['id'], allUsersFromState, signedInUser, e.target.value)


        let updatedUser = updatedUsers.filter(u => { if (u['id'] === signedInUser['id']) return u })


        dispatch(AllUser(updatedUsers))
        dispatch(SetLoggedInUser(updatedUser[0]))
        setGoToHomePage(true)

    }


    return (
        <div className='question-page'>
            <h3>Poll page</h3>
            {(isAuthed && Object.keys(questionChosen).length > 0) ?
                (
                    <div className='question-container'>

                        <h4>Would You Rather</h4>
                        <div>Question: {JSON.stringify(params)}</div>
                        {/* <div>Options:</div> */}
                        <div className='question-chosen'>
                            <div className='options-to-choose-from'>
                                <div className='poll-option'>
                                    <label>First Option:</label>
                                    <button type='submit' value="optionOne" name={questionChosen.id} onClick={handleSubmit}>
                                        {questionChosen.optionOne.text}
                                    </button>
                                </div>
                                <div className='poll-option'>
                                    <label>Second Option:</label>
                                    <button type='submit' value="optionTwo" name={questionChosen.id} onClick={handleSubmit}>
                                        {questionChosen.optionTwo.text}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <div><div>Question: {JSON.stringify(params)}</div></div>
            }
        </div>
    )
}


export default Question

