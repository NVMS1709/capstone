import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
export const getCategories = categories => ({ type: GET_CATEGORIES, categories })

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => {
    return function thunk(dispatch) {
        axios.get('/api/categories')
            .then(res => {
                const categories = res.data
                dispatch(getCategories(categories))
            })
            .catch(console.err)
    }
}

/**
 * REDUCER
 */
export default function (state = defaultCategories, action) {
    let newState = state
    switch (action.type) {
        case GET_CATEGORIES:
            newState = action.categories
            return newState
        default:
            return state
    }
}
