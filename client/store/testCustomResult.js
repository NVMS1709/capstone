
/**
 * ACTION TYPES
 */
const TEST_CUSTOM_RESULT = 'TEST_CUSTOM_RESULT'

/**
 * INITIAL STATE
 */
const defaultCustomResult = []

/**
 * ACTION CREATORS
 */
export const setCustomResult = result => ({ type: TEST_CUSTOM_RESULT, result })

/**
 * REDUCER
 */
export default function (state = defaultCustomResult, action) {
    let newState = state
    switch (action.type) {
        case TEST_CUSTOM_RESULT:
            newState = action.result
            return newState

        default:
            return state
    }
}
