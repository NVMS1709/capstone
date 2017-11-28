import axios from 'axios'
import { getQuestions, setResult, setCustomResult, userUpdate } from './index'
import history from '../history'

/**
 * ACTION TYPES
 */
const ALGORITHM_INPUT = 'ALGORITHM_INPUT'

/**
 * INITIAL STATE
 */
const defaultInput = ''

/**
 * ACTION CREATORS
 */
export const getAlgorithmInput = input => ({ type: ALGORITHM_INPUT, input })

/**
 * THUNK CREATORS
 */
export const postAlgorithmInput = (submission, question, questionsSolved) => {
  return function thunk(dispatch) {
    axios
      .post(`/api/algorithm-execution/${submission.language}`, {
        algorithmContent: submission.algorithmInput,
        question,
        questionsSolved
      })
      .then(res => {
        const results = res.data
        dispatch(setResult(results.rawOutput))
        dispatch(setCustomResult(results.testCasesArr))
        if (results.userId) {
          dispatch(
            userUpdate(results.userId, {
              questionsSolved: results.questionsSolved.concat([question.id])
            })
          )
        }
      })
      .catch(console.err)
  }
}

export const postNewAlgo = newAlgorithm => dispatch => {
  axios
    .post('/api/questions', newAlgorithm)
    .then(() => {
      axios.get('/api/questions').then(res => {
        const questions = res.data
        dispatch(getQuestions(questions))
        history.push('/user')
      })
    })
    .catch(console.err)
}

/**
 * REDUCER
 */
export default function (state = defaultInput, action) {
  let newState = Object.assign('', state)
  switch (action.type) {
    case ALGORITHM_INPUT:
      newState = action.input
      return newState

    default:
      return state
  }
}
