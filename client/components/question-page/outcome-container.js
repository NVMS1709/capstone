import React, { Component } from 'react'
import { connect } from 'react-redux'

class Outcome extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>Outcome Component To Be Rendered</h3>
      </div>
    )
  }
}

export default connect(null, null)(Outcome)
