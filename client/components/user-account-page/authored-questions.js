import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AuthoredQuestions = props => {


    const { questions, user } = props

    const userPublishedQuestions = questions.filter(
        question => question.userId === user.id && question.published
    )

    const userInProgressQuestions = questions.filter(
        question => question.userId === user.id && !question.published
    )


    return (
        <div id="authored-questions">
            <div>
                <div className="questions-column">
                    <div className="completed-questions-title">Published</div>
                    {userPublishedQuestions.map(question => (
                        <Link key={question.id} to={`/user-submission/${question.name}`} className="authored-questions-link">{question.name}</Link>
                    ))}
                </div>
                <div className="questions-column">
                    <div className="completed-questions-title">In Progress</div>
                    {userInProgressQuestions.map(question => (
                        <Link key={question.id} to={`/user-submission/${question.name}`} className="authored-questions-link">{question.name}</Link>
                    ))}
                </div>
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

export default connect(mapState)(AuthoredQuestions)