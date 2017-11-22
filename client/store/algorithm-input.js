import axios from 'axios'
import { getQuestions, setResult, setCustomResult, userUpdate } from './index'
import history from '../history'

/**
 * ACTION TYPES
 */
const ALGORITHM_INPUT = 'ALGORITHM_INPUT'

/**
 * INITIAL STATE
 */
const defaultInput = ''

/**
 * ACTION CREATORS
 */
export const getAlgorithmInput = input => ({ type: ALGORITHM_INPUT, input })

/**
 * THUNK CREATORS
 */
export const postAlgorithmInput = (submission, question, questionsSolved) => {
  return function thunk(dispatch) {
    axios
      .post(`/api/algorithm-execution/${submission.language}`, {
        algorithmContent: submission.algorithmInput,
        question,
        questionsSolved
      })
      .then(res => {
        const results = res.data
        dispatch(setResult(results.rawOutput))
        class BST {
          constructor(value) {
            this.value = value
            this.left = null
            this.right = null
          }

          insert(value) {
            if (value < this.value) {
              if (this.left === null) {
                this.left = new BST(value)
              } else {
                this.left.insert(value)
              }
            } else if (this.right === null) {
              this.right = new BST(value)
            } else {
              this.right.insert(value)
            }
            return this
          }

          contains(value) {
            if (value < this.value) {
              if (this.left === null) {
                return false
              } else {
                return this.left.contains(value)
              }
            } else if (value > this.value) {
              if (this.right === null) {
                return false
              } else {
                return this.right.contains(value)
              }
            } else {
              return true
            }
          }

          remove(value, parent = null) {
            if (value < this.value) {
              if (this.left !== null) {
                this.left.remove(value, this)
              }
            } else if (value > this.value) {
              if (this.right !== null) {
                this.right.remove(value, this)
              }
            } else if (this.left !== null && this.right !== null) {
              this.value = this.right.getMinValue()
              this.right.remove(this.value, this)
            } else if (parent === null) {
              if (this.left !== null) {
                this.value = this.left.value
                this.right = this.left.right
                this.left = this.left.left
              } else if (this.right !== null) {
                this.value = this.right.value
                this.left = this.right.left
                this.right = this.right.right
              } else {
                this.value = null
              }
            } else if (parent.left === this) {
              parent.left = this.left !== null ? this.left : this.right
            } else if (parent.right === this) {
              parent.right = this.left !== null ? this.left : this.right
            }
            return this
          }

          getMinValue() {
            if (this.left === null) {
              return this.value
            } else {
              return this.left.getMinValue()
            }
          }
        }

        dispatch(setCustomResult(results.testCasesArr))
        if (results.userId) {
          console.log('am i here', results.userId, results.questionsSolved)
          dispatch(
            userUpdate(results.userId, {
              questionsSolved: results.questionsSolved.concat([question.id])
            })
          )
        }
      })
      .catch(console.err)
  }
}

export const postNewAlgo = newAlgorithm => dispatch => {
  axios
    .post('/api/questions', newAlgorithm)
    .then(() => {
      axios.get('/api/questions').then(res => {
        const questions = res.data
        dispatch(getQuestions(questions))
        history.push('/user')
      })
    })
    .catch(console.err)
}

/**
 * REDUCER
 */
export default function(state = defaultInput, action) {
  let newState = Object.assign('', state)
  switch (action.type) {
    case ALGORITHM_INPUT:
      newState = action.input
      return newState

    default:
      return state
  }
}
