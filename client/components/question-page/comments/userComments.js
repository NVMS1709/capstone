import React, { Component } from 'react'
import { connect } from 'react-redux'

class Comments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="question-chat">
        <div className="posted-chat-container">
          <div className="posted-comments">
            <h1>hi</h1>
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

export default connect(null)(Comments)
