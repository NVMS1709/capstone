import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserAlgos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      algorithmsDisplayMode: 'In Progress'
    }
    this.setDisplayMode = this.setDisplayMode.bind(this)
  }

  setDisplayMode(event) {
    this.setState({ algorithmsDisplayMode: event.target.textContent })
  }

  render() {

    const { questions, user } = this.props

    const userPublishedQuestions = questions.filter(
      question => question.userId === user.id && question.published
    )

    const userInProgressQuestions = questions.filter(
      question => question.userId === user.id && !question.published
    )

    return (
      <div className="submissions">
        <div id="submissions-title">Your Algorithm Submissions</div>
        <div id="submissions-container">
          <div id="userpage-algorithms-button-container">
            <button onClick={this.setDisplayMode}>In Progress</button>
            <button onClick={this.setDisplayMode}>Published</button>
          </div>
          {this.state.algorithmsDisplayMode === 'In Progress'
            ?
            <div id="user-page-algorithms-list-container">
              {userInProgressQuestions.length
                ?
                userInProgressQuestions.map(question => (
                  <div key={question.id} className="user-page-submission-questions-list">
                    <div className="user-page-submission-questions-list-name">
                      {question.name}
                    </div>
                    <Link to={`/user-submission/${question.name}`} className="user-page-submission-questions-list-button">
                      EDIT
                    </Link>
                  </div>
                ))
                :
                <div className="user-page-submission-questions-list">No User Submitted Algorithms to Display </div>
              }
            </div>
            :
            <div>
              {userPublishedQuestions.length
                ?
                userPublishedQuestions.map(question => (
                  <div key={question.id} className="user-page-submission-questions-list">
                    <div className="user-page-submission-questions-list-name">
                      <Link key={question.id} to={`/questions/${question.name}`}>{question.name}</Link>
                    </div>
                    <button className="user-page-submission-questions-list-button">
                      MODIFY
                  </button>
                  </div>
                ))
                :
                <div className="user-page-submission-questions-list">No User Submitted Algorithms to Display </div>
              }
            </div>
          }
        </div>
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
