import React, { Component } from 'react'
import { connect } from 'react-redux'

class instructionMode extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Instruction Mode Component to be Rendered</h3>
      </div>
    )
  }
}

export default connect(null, null)(instructionMode)
