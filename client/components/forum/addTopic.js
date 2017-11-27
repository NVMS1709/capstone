import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTopic } from '../../store'

class Discussion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      newComment: '',
      editToggle: ''
    }
    this.newTopic = {}
    this.toggleView = this.toggleView.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeComment = this.onChangeComment.bind(this)
    this.forumTitle = []
  }

  discardChanges() {
    this.setState({ editToggle: '' })
  }

  onChange(event) {
    this.setState({ title: event.target.value })
  }

  onChangeComment(event) {
    this.setState({ newComment: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    this.newTopic.comment = this.state.newComment
    this.newTopic.userId = this.props.user.id
    this.newTopic.title = this.state.title
    this.props.addTopic(this.newTopic)
    this.props.toggle()
  }

  toggleView() {
    this.props.toggle()
  }

  render() {
    return (
      <div>
        <div className="comments-top-box">
          <h3>Submit New Forum Topic</h3>
        </div>
        <div className="question-chat">
          <div className="post-chat-container">
            <form onSubmit={this.onSubmit}>
              <span>
                Topic:{'   '}
                <input
                  name="title"
                  size="50"
                  required="required"
                  value={this.state.title}
                  onChange={this.onChange}
                />
              </span>

              <p>Comments:</p>
              <textarea
                rows="3"
                name="comment"
                required="required"
                value={this.state.newComment}
                onChange={this.onChangeComment}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="posted-chat-container">
            <div className="posted-comments" />
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
    addTopic: topic => dispatch(addTopic(topic))
  }
}

export default connect(mapState, mapDispatch)(Discussion)
