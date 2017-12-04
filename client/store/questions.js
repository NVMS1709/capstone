import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_QUESTIONS = 'GET_QUESTIONS'
const GET_QUESTION = 'GET_QUESTION'
const REMOVE_QUESTION = 'REMOVE_QUESTION'

/**
 * INITIAL STATE
 */
const defaultQuestions = []

/**
 * ACTION CREATORS
 */
export const getQuestions = questions => ({ type: GET_QUESTIONS, questions })
export const getQuestion = question => ({ type: GET_QUESTION, question })
export const removeQuestion = questionId => ({ type: REMOVE_QUESTION, questionId })

/**
 * THUNK CREATORS
 */
export const fetchQuestions = () => {
  return function thunk(dispatch) {
    axios.get('/api/questions')
      .then(res => {
        const questions = res.data
        dispatch(getQuestions(questions))
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

//TODO dispatch to get new questions
export const postUserAlgorithmQuestion = questionSubmission => {
  return function thunk(dispatch) {
    return axios
      .post('/api/questions', questionSubmission)
      .then((res) => {
        return new Promise(resolve => {
          resolve(dispatch(getQuestion(res.data)))
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const deleteUserAlgorithmQuestion = question => {
  return function thunk(dispatch) {
    return axios.delete(`/api/questions/${question.id}`)
      .then(res => res.data)
      .then((message) => {
        if (message === 'DELETE SUCCESS') {
          return new Promise(resolve => {
            resolve(dispatch(removeQuestion(question.id)))
          })
            .then(() => {
              return
            })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

/**
 * REDUCER
 */
export default function (state = defaultQuestions, action) {
  let newState = Object.create([], state)
  switch (action.type) {
    case GET_QUESTIONS:
      newState = action.questions
      return newState
    case GET_QUESTION:
      return [...state, action.question]
    case REMOVE_QUESTION:
      let index = state.indexOf(state.find(question => +action.questionId === +question.id))
      let firstPart = state.slice(0, index)
      let secondPart = state.slice(index + 1)
      return firstPart.concat(secondPart)
    default:
      return state
  }
}
