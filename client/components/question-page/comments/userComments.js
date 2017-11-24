import React, { Component } from 'react'
import { connect } from 'react-redux'
import { questionComments } from '../../../store'

class Comments extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.questionComments(
      this.props.currentQuestion && this.props.currentQuestion.id
    )
  }

  render() {
    return (
      <div className="question-chat">
        <div className="posted-chat-container">
          <div className="posted-comments">
            {this.props &&
              this.props.comments.map(comment => {
                return (
                  <div key={comment.id}>
                    <p>{comment.comment}</p>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="post-chat-container">
          <form>
            <textarea rows="3" />
            <button>SUBMIT</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    comments: state.comments
  }
}

const mapDispatch = dispatch => {
  return {
    questionComments: questionId => dispatch(questionComments(questionId))
  }
}

export default connect(mapState, mapDispatch)(Comments)
