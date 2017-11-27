import axios from 'axios'
// import history from '../history'

/**
 * ACTION TYPES
 */
const GET_QUESTIONS = 'GET_QUESTIONS'
const GET_QUESTION = 'GET_QUESTION'

/**
 * INITIAL STATE
 */
const defaultQuestions = []

/**
 * ACTION CREATORS
 */
export const getQuestions = questions => ({ type: GET_QUESTIONS, questions })
export const getQuestion = question => ({ type: GET_QUESTION, question })

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

//TODO dispatch to get new questions
export const postUserAlgorithmQuestion = questionSubmission => {
    return function thunk(dispatch) {
        return axios
            .post('/api/questions', questionSubmission)
            .then((res) => {
                return new Promise(resolve => {
                    resolve(dispatch(getQuestion(res.data)))
                })
                    .then(() => {
                        return res.data
                    })
            })
            .catch(console.err)
    }
}

/**
 * REDUCER
 */
export default function (state = defaultQuestions, action) {
    let newState = Object.create([], state)
    switch (action.type) {
        case GET_QUESTIONS:
            newState = action.questions
            return newState
        case GET_QUESTION:
            return [...state, action.question]
        default:
            return state
    }
}
