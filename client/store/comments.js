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
export const questionComments = () => {
  return function thunk(dispatch) {
    axios
      .get('/api/comments')
      .then(res => {
        const comments = res.data
        dispatch(getComments(comments))
      })
      .catch(console.err)
  }
}

export const postComment = comment => {
  return function thunk(dispatch) {
    axios
      .post('/api/comments', comment)
      .then(() => {
        return axios.get('/api/comments').then(res => {
          const comments = res.data
          dispatch(getComments(comments))
        })
      })
      .catch(console.err)
  }
}

export const commentDelete = id => {
  return function thunk(dispatch) {
    axios
      .delete(`/api/comments/${id}`)
      .then(() => {
        return axios.get('/api/comments').then(res => {
          const comments = res.data
          dispatch(getComments(comments))
        })
      })
      .catch(console.err)
  }
}

export const commentEdit = (id, comment) => {
  return function thunk(dispatch) {
    axios
      .put(`/api/comments/${id}`, { comment })
      .then(() => {
        return axios.get('/api/comments').then(res => {
          const comments = res.data
          dispatch(getComments(comments))
        })
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
