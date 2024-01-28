import {
   _getUsers,
   _getQuestions,
   _saveQuestion,
   _saveQuestionAnswer,
} from './_data.js'


export async function getUsers() {

   try {
      const data = await _getUsers()
      if (data !== undefined) {
         const dataArray = Object.values(data)

         return dataArray
      }
   }
   catch (error) {
      console.log('error message from catch => " ', error.message)
   }
}

export async function getInitialQuestions() {

   try {
      const data = await _getQuestions()

      if (data !== undefined) {
         const dataArray = Object.values(data)
    
         return dataArray
      }
   }
   catch (error) {
      console.log('error message from catch => " ', error.message)
   }
}

export async function loginCheck(formData) {

   try {
      const data = await _getUsers()
      if (data !== undefined) {
         const dataArray = Object.values(data)
      

         if (dataArray.filter((user) => user.id === formData.userID).filter((u) => u.password === formData.password).length > 0) {

            const dataToReturn = dataArray.filter((user) => user.id === formData.userID)


            return dataToReturn;
         } else
            throw (`User with id:${formData.userID} and password: ${formData.password} Does Not exists`).toString
      }
   }
   catch (error) {
      alert(error.message)
   }
}


export async function saveNewQuestion({ author, optionTextOne, optionTextTwo }) {

   try {
      const data = await _saveQuestion({
         'author': author,
         'optionOneText': optionTextOne,
         'optionTwoText': optionTextTwo,
      })
      if (data !== undefined) {

         return data
      }
   }
   catch (error) {
      console.log('error message from catch => " ', error.message)
   }
}

export async function saveNewAnswer({ loggedInUser, qid, answer }) {
   try {
      const data = await _saveQuestionAnswer({
         'loggedInUser': loggedInUser['id'],
         'qid': qid,
         'answer': answer,
      })
      if (data !== undefined) {
         return (data)
      }
   }
   catch (error) {
      console.log('error message from catch => " ', error.message)
   }
}

export function updateUsersAnswerArray(questionID, users, userpicking, answerOption) {


   let newAnswerObject = { ...userpicking['answers'], [questionID]: answerOption }

   let newUserObject = {
      id: userpicking['id'],
      password: userpicking['password'],
      name: userpicking['name'],
      avatarURL: userpicking['avatarURL'],
      answers: newAnswerObject,
      questions: userpicking['questions']
   }


   const returningNewUsersArray = users.map(u => u['id'] === userpicking['id'] ? newUserObject : u)
   return returningNewUsersArray
}

export function updateUsersQuestionsArray({questionId, users, existingUser}) {


   let newQuestionsArray = [...existingUser['questions'], questionId]
   
   let newUserObject = {
      id: existingUser['id'],
      password: existingUser['password'],
      name: existingUser['name'],
      avatarURL: existingUser['avatarURL'],
      answers: existingUser['answers'],
      questions: newQuestionsArray
   }

   const returningNewUsersArray = users.map(u => u['id'] === existingUser['id'] ? newUserObject : u)
   return returningNewUsersArray
}