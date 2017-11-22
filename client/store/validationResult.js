
/**
 * ACTION TYPES
 */
const VALIDATION_RESULT = 'VALIDATION_RESULT'

/**
 * INITIAL STATE
 */
const defaultValidationResult = ''

/**
 * ACTION CREATORS
 */
export const setValidationResult = result => ({ type: VALIDATION_RESULT, result })

/**
 * REDUCER
 */
export default function (state = defaultValidationResult, action) {
    let newState = state
    switch (action.type) {
        case VALIDATION_RESULT:
            newState = action.result
            return newState

        default:
            return state
    }
}
