import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_COMMENTS = 'GET_COMMENTS'

/**
 * INITIAL STATE
 */
const defaultForumComments = []

/**
 * ACTION CREATORS
 */
export const forumComments = comments => ({ type: GET_COMMENTS, comments })

/**
 * THUNK CREATORS
 */
export const getForumComments = title => {
  return function thunk(dispatch) {
    axios
      .post('/api/forum/comments', { title })
      .then(res => {
        const comments = res.data
        dispatch(forumComments(comments))
      })
      .catch(console.err)
  }
}

export const newCommentForum = comment => {
  return function thunk(dispatch) {
    axios
      .post('/api/forum/comment/new', comment)
      .then(() => {
        return axios.post('/api/forum/comments', comment)
      })
      .then(res => {
        const comments = res.data
        dispatch(forumComments(comments))
      })
      .catch(console.err)
  }
}

export const deleteForumComment = (id, title) => {
  return function thunk(dispatch) {
    axios
      .delete(`/api/forum/comments/${id}`)
      .then(() => {
        return axios.post('/api/forum/comments', { title })
      })
      .then(res => {
        const comments = res.data
        dispatch(forumComments(comments))
      })
      .catch(console.err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultForumComments, action) {
  let newState = state
  switch (action.type) {
    case GET_COMMENTS:
      newState = action.comments
      return newState
    default:
      return state
  }
}
