import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editTopic } from '../../store'

class EditTopic extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      newComment: '',
      editToggle: '',
      editForum: true
    }

    this.toggleView = this.toggleView.bind(this)
  }

  toggleView() {
    this.props.toggle()
  }

  render() {
    console.log('MY PROPS', this.props)
    return (
      <div>
        <div className="comments-top-box">
          <h3>Edit Forum Topic</h3>
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

              <p>Edit Comments:</p>
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
    editTopic: topic => dispatch(editTopic(topic))
  }
}

export default connect(mapState, mapDispatch)(EditTopic)
