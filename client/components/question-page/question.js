import React from 'react'

const QuestionDescription = props => {
  return (
    <div className="instructions-shell">
      {props.currentQuestion && <div>{props.currentQuestion.description}</div>}
    </div>
  )
}

export default QuestionDescription
