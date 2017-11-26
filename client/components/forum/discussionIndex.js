import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentEdit } from '../../store'

class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newComment: '',
      editToggle: '',
      comment: ''
    }
    this.newComment = {}
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.editComment = this.editComment.bind(this)
    this.discardChanges = this.discardChanges.bind(this)
    this.onChangeEdit = this.onChangeEdit.bind(this)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
  }

  componentDidMount() {}

  editComment(id, comment) {
    this.setState({ editToggle: id, comment })
  }

  discardChanges() {
    this.setState({ editToggle: '' })
  }

  onChangeEdit(event) {
    this.setState({ comment: event.target.value })
  }

  onSubmitEdit(event) {
    event.preventDefault()
    this.props.commentEdit(this.state.editToggle, this.state.comment)
    this.setState({ editToggle: '' })
  }

  deleteComment(id) {
    this.props.commentDelete(id)
  }

  onChange(event) {
    this.setState({ newComment: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    this.newComment.comment = this.state.newComment
    this.newComment.userId = this.props.user.id
    this.props.postComment(this.newComment)
    this.setState({ newComment: '' })
  }

  render() {
    return (
      <div className="question-chat">
        <div className="post-chat-container">
          <p style={{ fontSize: '18px' }}>Comments:</p>
          <form onSubmit={this.onSubmit}>
            <textarea
              rows="3"
              name="comment"
              value={this.state.newComment}
              onChange={this.onChange}
            />
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
                    <p>{comment.comment} </p>
                    {comment.userId === this.props.user.id ? (
                      <div>
                        <button onClick={() => this.deleteComment(comment.id)}>
                          Delete
                        </button>
                        <button
                          onClick={() =>
                            this.editComment(comment.id, comment.comment)
                          }
                        >
                          Edit
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                    {this.state.editToggle === comment.id ? (
                      <form onSubmit={this.onSubmitEdit}>
                        <textarea
                          rows="3"
                          name="comment"
                          value={this.state.comment}
                          onChange={this.onChangeEdit}
                        />
                        <button type="submit">Submit Edit</button>
                        <button onClick={this.discardChanges}>
                          Discard Changes
                        </button>
                      </form>
                    ) : (
                      ''
                    )}
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

const mapState = (state, ownProps) => {
  console.log(ownProps)
  return {}
}

const mapDispatch = dispatch => {
  return {
    questionComments: () => dispatch(questionComments()),
    postComment: comment => dispatch(postComment(comment)),
    commentDelete: id => dispatch(commentDelete(id)),
    commentEdit: (id, comment) => dispatch(commentEdit(id, comment))
  }
}

export default connect(mapState, mapDispatch)(Discussion)
