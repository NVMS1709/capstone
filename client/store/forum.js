import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_FORUM = 'GET_FORUM'

/**
 * INITIAL STATE
 */
const defaultForum = []

/**
 * ACTION CREATORS
 */
export const getForum = forum => ({ type: GET_FORUM, forum })

/**
 * THUNK CREATORS
 */
export const getForumTitles = () => {
  return function thunk(dispatch) {
    axios
      .get('/api/forum')
      .then(res => {
        const forum = res.data
        dispatch(getForum(forum))
      })
      .catch(console.err)
  }
}

export const addTopic = topic => {
  return function thunk(dispatch) {
    console.log(topic)
    axios
      .post('/api/forum', topic)
      .then(() =>
        axios.get('/api/forum').then(res => {
          const forum = res.data
          dispatch(getForum(forum))
        })
      )
      .catch(console.err)
  }
}

// export const postComment = comment => {
//   return function thunk(dispatch) {
//     axios
//       .post('/api/comments', comment)
//       .then(() => {
//         return axios.get('/api/comments').then(res => {
//           const comments = res.data
//           dispatch(getComments(comments))
//         })
//       })
//       .catch(console.err)
//   }
// }

// export const commentDelete = id => {
//   return function thunk(dispatch) {
//     axios
//       .delete(`/api/comments/${id}`)
//       .then(() => {
//         return axios.get('/api/comments').then(res => {
//           const comments = res.data
//           dispatch(getComments(comments))
//         })
//       })
//       .catch(console.err)
//   }
// }

// export const commentEdit = (id, comment) => {
//   return function thunk(dispatch) {
//     axios
//       .put(`/api/comments/${id}`, { comment })
//       .then(() => {
//         return axios.get('/api/comments').then(res => {
//           const comments = res.data
//           dispatch(getComments(comments))
//         })
//       })
//       .catch(console.err)
//   }
// }

/**
 * REDUCER
 */
export default function(state = defaultForum, action) {
  let newState = state
  switch (action.type) {
    case GET_FORUM:
      newState = action.forum
      return newState
    default:
      return state
  }
}
