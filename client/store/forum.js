import axios from 'axios'
import history from '../history'
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
      .catch(console.error)
  }
}

export const addTopic = topic => {
  return function thunk(dispatch) {
    axios
      .post('/api/forum', topic)
      .then(() =>
        axios.get('/api/forum').then(res => {
          const forum = res.data
          dispatch(getForum(forum))
        })
      )
      .catch(console.error)
  }
}

export const editTopic = ({userId, topic, comment}) => {
  console.log('my id', userId)
  return function thunk(dispatch) {
    axios
      .put(`/api/forum/${userId}`, { topic, comment })
      .then(() => {
        return axios.get(`/api/forum/${userId}`).then(res => {
          console.log('FROM THUNK', res.data)
        })
      })
      .catch(console.error)
  }
}

export const deleteTopic = id => {
  return function thunk(dispatch) {
    axios
      .delete(`/api/forum/${id}`)
      .then(() =>
        axios.get('/api/forum').then(res => {
          const forum = res.data
          dispatch(getForum(forum))
          history.push('/forum')
        })
      )
      .catch(console.error)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultForum, action) {
  let newState = state
  switch (action.type) {
    case GET_FORUM:
      newState = action.forum
      return newState
    default:
      return state
  }
}
