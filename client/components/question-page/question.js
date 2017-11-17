import React, { Component } from 'react'
import { connect } from 'react-redux'

const QuestionDescription = (props) => {

  return (
    <div className="question-description">
      {props.currentQuestion && <div>{props.currentQuestion.description}</div>}
    </div>
  )
}


export default QuestionDescription
