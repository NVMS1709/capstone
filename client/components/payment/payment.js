import React, { Component } from 'react'
import { connect } from 'react-redux'
import Stripe from './stripe'

class Payment extends Component {
  constructor(props) {
    super(props)
    this.num = 0
  }

  render() {
    const user = this.props.user
    module.exports = user
    return (
      <div className="code-editor">
        <Stripe />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Payment)
