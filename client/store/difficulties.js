import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_DIFFICULTIES = 'GET_DIFFICULTIES'

/**
 * INITIAL STATE
 */
const defaultDifficulties = []

/**
 * ACTION CREATORS
 */
export const getDifficulties = difficulties => ({ type: GET_DIFFICULTIES, difficulties })

/**
 * THUNK CREATORS
 */
export const fetchDifficulties = () => {
    return function thunk(dispatch) {
        axios.get('/api/difficulties')
            .then(res => {
                const difficulties = res.data
                dispatch(getDifficulties(difficulties))
            })
            .catch(console.err)
    }
}

/**
 * REDUCER
 */
export default function (state = defaultDifficulties, action) {
    let newState = state
    switch (action.type) {
        case GET_DIFFICULTIES:
            newState = action.difficulties
            return newState
        default:
            return state
    }
}
