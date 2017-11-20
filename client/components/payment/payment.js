import React, { Component } from 'react'
import { connect } from 'react-redux'
import Stripe from './stripe'

class Payment extends Component {
  render() {
    return <Stripe />
  }
}

export default connect()(Payment)
