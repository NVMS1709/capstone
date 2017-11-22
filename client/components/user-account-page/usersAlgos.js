import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserAlgos extends Component {
  constructor(props) {
    super(props)
    this.num = 0
  }
  render() {
    
    const questions = this.props.questions
    const user = this.props.user
    const userQuestions = questions.filter(
      question => question.userId === user.id
    )
    return (
      <div className="submissions">
        <p>User Submitted Algorithms</p>
        {userQuestions.length ? (
          userQuestions.map(question => {
            const urlName = question.name.trim().replace(/ /g, '%20')
            return (
              <div key={question.id}>
                <Link key={question.id} to={`/questions/${urlName}`}>
                  User Submitted Algorithms: {question.name}
                </Link>
              </div>
            )
          })
        ) : (
          <p>No User Submitted Algorithms to Display </p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    questions: state.questions,
    user: state.user
  }
}

export default connect(mapState)(UserAlgos)

/* <p key={question.id}> hi </p> */
