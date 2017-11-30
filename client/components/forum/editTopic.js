import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editTopic } from '../../store'

class EditTopic extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      newComment: '',
      editForum: true
    }
    this.updatedForum = {}
    this.toggleView = this.toggleView.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeComment = this.onChangeComment.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  toggleView() {
    this.props.toggle()
  }

  onSubmit(event) {
    event.preventDefault()
    const forumId = this.props.forum.filter(topic => topic.title === this.props.titleForum)[0].id

    this.updatedForum.forumId = forumId
    this.updatedForum.userId = this.props.user.id
    this.updatedForum.title = this.state.title
    this.updatedForum.comment = this.state.newComment
    this.props.editTopic(this.updatedForum)
    this.props.toggle()
  }

  onChangeTitle(event) {
    this.setState({ title: event.target.value })
  }

  onChangeComment(event) {
    this.setState({ newComment: event.target.value })
  }

  render() {
    return (
      <div>
        <div className="comments-top-box">
          <h3>Edit Forum Topic</h3>
        </div>
        <div className="question-chat">
          <div className="post-chat-container">
            <form onSubmit={this.onSubmit}>
              <span>
                Edit Topic:{' '}
                <input
                  name="title"
                  size="50"
                  required="required"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
              </span>
              <span>
              <p>Edit Comment:</p>
              <textarea
                rows="3"
                name="comment"
                required="required"
                value={this.state.newComment}
                onChange={this.onChangeComment}
              />
              </span>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="comments-top-box">
          <button onClick={this.toggleView}>Main Forum Page</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    forum: state.forum,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    editTopic: topic => dispatch(editTopic(topic))
  }
}

export default connect(mapState, mapDispatch)(EditTopic)
