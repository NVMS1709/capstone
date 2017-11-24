import React, { Component } from 'react'
import { connect } from 'react-redux'
import { questionComments, postComment } from '../../../store'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.newComment = {}
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.props.questionComments()
  }

  onChange(event) {
    this.newComment[event.target.name] = event.target.value
    console.log(this.newComment)
  }

  onSubmit(event) {
    event.preventDefault()
    this.newComment.questionId = this.props.currentQuestion.id
    this.newComment.userId = this.props.user.id
    //this.postComment(this.newComment)
    console.log(this.newComment)
  }

  render() {
    const currentQuestion =
      this.props.currentQuestion && this.props.currentQuestion.id
    const currentComments =
      this.props.comments &&
      this.props.comments.filter(
        comments => comments.questionId === currentQuestion
      )
    return (
      <div className="question-chat">
        <div className="post-chat-container">
          <p style={{ fontSize: '18px' }}>Comments:</p>
          <form onSubmit={this.onSubmit}>
            <textarea rows="3" name="comment" onChange={this.onChange} />
            <button type="submit">Submit New Comment</button>
          </form>
        </div>
        <div className="posted-chat-container">
          <div className="posted-comments">
            {currentComments.map(comment => {
              let year = comment.createdAt.slice(0, 4)
              let month = comment.createdAt.slice(5, 7)
              let day = comment.createdAt.slice(8, 10)
              return (
                <div key={comment.id}>
                  <span className="user-name-comment">
                    {comment.user.name}:
                  </span>
                  <span className="posted-date">
                    {' '}
                    (posted) {month}/{day}/{year}
                  </span>
                  <div className="user-comment">
                    <p>
                      {comment.comment}{' '}
                      {comment.userId === this.props.user.id ? (
                        <button>Delete Comment</button>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    comments: state.comments,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    questionComments: () => dispatch(questionComments()),
    postComment: comment => dispatch(postComment(comment))
  }
}

export default connect(mapState, mapDispatch)(Comments)
