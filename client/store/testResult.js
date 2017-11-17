
/**
 * ACTION TYPES
 */
const TEST_RESULT = 'TEST_RESULT'

/**
 * INITIAL STATE
 */
const defaultResult = ''

/**
 * ACTION CREATORS
 */
export const setResult = result => ({ type: TEST_RESULT, result })

/**
 * REDUCER
 */
export default function (state = defaultResult, action) {
    let newState = state
    switch (action.type) {
        case TEST_RESULT:
            newState = action.result
            return newState

        default:
            return state
    }
}
