import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getForumTitles, getForumComments } from '../../store'

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
    this.forumTitle = []
  }

  componentDidMount() {
    this.props.getForumTitles()
    this.props.getForumComments(this.props.titleForum)
  }

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
    this.forumTitle =
      this.props &&
      this.props.forum.filter(forum => forum.title === this.props.titleForum)[0]
    console.log(this.forumTitle)

    return (
      <div className="question-chat">
        <h3>{this.forumTitle && this.forumTitle.title}</h3>
        <h6>{this.forumTitle && this.forumTitle.title}</h6>
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
            {this.props &&
              this.props.forumComments.map(comment => {
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
                          <button
                            onClick={() => this.deleteComment(comment.id)}
                          >
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
  return {
    titleForum: ownProps.location.pathname.slice(7),
    forumComments: state.forumComments,
    forum: state.forum,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getForumTitles: () => dispatch(getForumTitles()),
    getForumComments: title => dispatch(getForumComments(title))
  }
}

export default connect(mapState, mapDispatch)(Discussion)
