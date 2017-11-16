import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_QUESTIONS = 'GET_QUESTIONS'

/**
 * INITIAL STATE
 */
const defaultQuestions = []

/**
 * ACTION CREATORS
 */
export const getQuestions = questions => ({ type: GET_QUESTIONS, questions })

/**
 * THUNK CREATORS
 */
export const fetchQuestions = () => {
    return function thunk(dispatch) {
        axios.get('/api/questions')
            .then(res => {
                const questions = res.data
                dispatch(getQuestions(questions))
            })
            .catch(console.err)
    }
}

/**
 * REDUCER
 */
export default function (state = defaultQuestions, action) {
    let newState = state
    switch (action.type) {
        case GET_QUESTIONS:
            newState = action.questions
            return newState

        default:
            return state
    }
}