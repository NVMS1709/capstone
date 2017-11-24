import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const QUESTION_COMMENTS = 'QUESTION_COMMENTS'

/**
 * INITIAL STATE
 */
const defaultComments = []

/**
 * ACTION CREATORS
 */
export const getComments = comments => ({ type: QUESTION_COMMENTS, comments })

/**
 * THUNK CREATORS
 */
export const questionComments = questionId => {
  console.log('THUNK', questionId)
  return function thunk(dispatch) {
    axios
      .get('/api/comments', questionId)
      .then(res => {
        const comments = res.data
        dispatch(getComments(comments))
      })
      .catch(console.err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultComments, action) {
  let newState = state
  switch (action.type) {
    case QUESTION_COMMENTS:
      newState = action.comments
      return newState
    default:
      return state
  }
}
