import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const CompletedQuestions = props => {

  const { questions, user } = props

  const questionsCompleted = questions.filter(
    question => user.questionsSolved.includes(question.id)
  )

  return (
    <div id="completed-questions">
      <div>
        {questionsCompleted && questionsCompleted.map(question => (
          <Link className="completed-questions-link" key={question.id} to={`/questions/${question.name}`} > {question.name}</Link>
        ))}
      </div>
    </div>
  )

}

const mapState = state => {
  return {
    questions: state.questions,
    user: state.user
  }
}

export default connect(mapState)(CompletedQuestions)
