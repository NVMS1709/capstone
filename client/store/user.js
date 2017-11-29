import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

export const auth = (email, password, method, currentLocation) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(res => {
      dispatch(getUser(res.data))
      if (currentLocation === '/login') {history.push('/home')}
      else {
        history.push(currentLocation)
      }
    })
    .catch(error => dispatch(getUser({ error })))

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/home')
    })
    .catch(err => console.log(err))

export const userUpdate = (id, user) => dispatch => {
  return axios
    .put(`/api/users/${id}`, user)
    .then(results => {
      //Choose not to dispatch(updateUser(updatedUser)), because causing login modal to pop up
      return results.data
    })
    .catch(err => {
      return err
    })
}

export const passwordUpdate = (id, user) => dispatch => {
  console.log('HERE IN THUNK')
  return axios
    .put(`/api/users/password/${id}`, user)
    .then(results => {
      //Choose not to dispatch(updateUser(updatedUser)), because causing login modal to pop up
      return results.data
    })
    .catch(err => {
      return err
    })
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
