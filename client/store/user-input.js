// import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const USER_INPUT = 'USER_INPUT'

/**
 * INITIAL STATE
 */
const defaultInput = ''

/**
 * ACTION CREATORS
 */
export const getInput = input => ({ type: USER_INPUT, input })

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = defaultInput, action) {
  let newState = Object.assign('', state)
  switch (action.type) {
    case USER_INPUT:
      newState = action.input
      return newState

    default:
      return state
  }
}
