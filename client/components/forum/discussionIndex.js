import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getForumTitles,
  getForumComments,
  newCommentForum,
  deleteForumComment,
  deleteTopic
} from '../../store'
import history from '../../history'

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
    this.deleteTopic = this.deleteTopic.bind(this)
    // this.editComment = this.editComment.bind(this)
    // this.discardChanges = this.discardChanges.bind(this)
    // this.onChangeEdit = this.onChangeEdit.bind(this)
    // this.onSubmitEdit = this.onSubmitEdit.bind(this)
    this.forumTitle = []
  }

  componentDidMount() {
    this.props.getForumTitles()
    this.props.getForumComments(this.props.titleForum)
  }

  discardChanges() {
    this.setState({ editToggle: '' })
  }

  deleteTopic(id) {
    this.props.deleteTopic(id)
    history.push('/forum')
  }

  deleteComment(id, forumTitle) {
    this.props.deleteForumComment(id, forumTitle)
  }

  onChange(event) {
    this.setState({ newComment: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    this.newComment.comment = this.state.newComment
    this.newComment.userId = this.props.user.id
    this.newComment.forumId = this.forumTitle.id
    this.newComment.title = this.forumTitle.title
    this.props.newCommentForum(this.newComment)
    this.setState({ newComment: '' })
  }

  render() {
    this.forumTitle =
      this.props &&
      this.props.forum.filter(forum => forum.title === this.props.titleForum)[0]
    let titleYear = this.forumTitle && this.forumTitle.createdAt.slice(0, 4)
    let titleMonth = this.forumTitle && this.forumTitle.createdAt.slice(5, 7)
    let titleDay = this.forumTitle && this.forumTitle.createdAt.slice(8, 10)
    let topicUserId = this.forumTitle && this.forumTitle.user.id
    let currentUserId = this.props.user && this.props.user.id
    return (
      <div>
        <div className="comments-top-box">
          <h3>{this.forumTitle && this.forumTitle.title}</h3>
        </div>
        <div className="comments-comment-box">
          <p>{this.forumTitle && this.forumTitle.comment}</p>
        </div>
        {topicUserId === currentUserId ? (
          <button
            onClick={() => this.deleteTopic(this.forumTitle.id)}
            className="delete-topic-button"
          >
            Delete Topic
          </button>
        ) : (
          ''
        )}
        <div className="comments-user-box">
          <p className="forum-comments-user">
            Submitted By: {this.forumTitle && this.forumTitle.user.name}{' '}
            (posted) {titleMonth}/{titleDay}/{titleYear}
          </p>
        </div>
        <div className="question-chat">
          <div className="post-chat-container">
            <p style={{ fontSize: '14px' }}>Post Comment</p>
            <form onSubmit={this.onSubmit}>
              <textarea
                rows="2"
                name="comment"
                style={{ borderStyle: 'none none solid none' }}
                value={this.state.newComment}
                onChange={this.onChange}
              />
              <button type="submit">Submit</button>
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
                              onClick={() =>
                                this.deleteComment(
                                  comment.id,
                                  this.forumTitle.title
                                )
                              }
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
    getForumComments: title => dispatch(getForumComments(title)),
    newCommentForum: (comment, userId, forumId, title) =>
      dispatch(newCommentForum(comment, userId, forumId, title)),
    deleteForumComment: (id, forumTitle) =>
      dispatch(deleteForumComment(id, forumTitle)),
    deleteTopic: id => dispatch(deleteTopic(id))
  }
}

export default connect(mapState, mapDispatch)(Discussion)
