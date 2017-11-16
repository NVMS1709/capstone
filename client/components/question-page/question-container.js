import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Question Goes Here</h3>
      </div>
    )
  }
}

export default connect(null, null)(Question)
