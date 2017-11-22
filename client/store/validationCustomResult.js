
/**
 * ACTION TYPES
 */
const VALIDATION_CUSTOM_RESULT = 'VALIDATION_CUSTOM_RESULT'

/**
 * INITIAL STATE
 */
const defaultValidationCustomResult = []

/**
 * ACTION CREATORS
 */
export const setValidationCustomResult = result => ({ type: VALIDATION_CUSTOM_RESULT, result })

/**
 * REDUCER
 */
export default function (state = defaultValidationCustomResult, action) {
    let newState = state
    switch (action.type) {
        case VALIDATION_CUSTOM_RESULT:
            newState = action.result
            return newState

        default:
            return state
    }
}
