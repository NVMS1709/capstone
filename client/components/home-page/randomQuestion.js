import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getRandomQuestion from './randomQuestion_util'

const RandomQuestion = (props) => {

    const { questions, user } = props
    const currentRandomQuestion = getRandomQuestion(user.questionsSolved, questions)
    return (
        <div id="random-question-container">
            <div id="question-column-container">
                {currentRandomQuestion && <div>Your Next Challenge   ➩ <Link id="randomQuestionLink" to={`/questions/${currentRandomQuestion.name}`}>{currentRandomQuestion.name}</Link></div>}
            </div>
        </div>
    )

}

const mapState = (state) => {
    return {
        questions: state.questions,
        user: state.user
    }
}

export default connect(mapState)(RandomQuestion)
