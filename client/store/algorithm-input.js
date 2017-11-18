import axios from 'axios'
import { getQuestions, setResult } from './index'
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
export const postAlgorithmInput = (algorithmInput, question) => {
  return function thunk(dispatch) {
    axios
      .post('/api/algorithm-execution', {
        algorithmContent: algorithmInput,
        question
      })
      .then(res => {
        console.log(res)
        dispatch(setResult(res))
        // will get the test results here
        // const questions = res.data
        // dispatch(getQuestions(questions))
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
export default function(state = defaultInput, action) {
  let newState = Object.assign('', state)
  switch (action.type) {
    case ALGORITHM_INPUT:
      newState = action.input
      return newState

    default:
      return state
  }
}
