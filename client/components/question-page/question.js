import React from 'react'

const QuestionDescription = props => {
  return (
    <div className="question-description">
      {props.currentQuestion && <div>{props.currentQuestion.description}</div>}
    </div>
  )
}

export default QuestionDescription
