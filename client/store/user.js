import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = user => ({ type: UPDATE_USER, user })

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/home')
    })
    .catch(error => dispatch(getUser({ error })))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.log(err))

export const userUpdate = (id, user) => dispatch => {
  axios
    .put(`/api/users/${id}`, user)
    .then(() => {
      return axios
        .get('/auth/me')
        .then(res => dispatch(getUser(res.data || defaultUser)))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

export const sendPayment = (token, userId) => dispatch => {
  axios.post('/api/payment', { stripeToken: token }).then(() => {
    // Need to get user id - set member status for user in db
    axios
      .put(`/api/users/${userId}`, { membership: new Date() })
      .then(() => {
        return axios
          .get('/auth/me')
          .then(res => dispatch(getUser(res.data || defaultUser)))
      })
      .catch(console.err)
  })
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
