import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getRandomQuestion from './randomQuestion_util'

const RandomQuestion = (props) => {

    let { questions, user } = props

    questions = questions.filter(question => question.published)

    let currentRandomQuestion = {}

    if (user.questionsSolved) {
        currentRandomQuestion = getRandomQuestion(user.questionsSolved, questions)
    } else {
        currentRandomQuestion = getRandomQuestion([], questions)
    }

    return (
        <div id="random-question-container">
            <div id="question-column-container">
                {currentRandomQuestion && <div>{props.user.name}, your next challenge   ➩ <Link id="randomQuestionLink" to={`/questions/${currentRandomQuestion.name}`}>{currentRandomQuestion.name}</Link></div>}
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
