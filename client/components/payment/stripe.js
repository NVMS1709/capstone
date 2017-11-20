import React, { Component } from 'react'
import { sendPayment } from '../../store/index'
import { connect } from 'react-redux'

class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripeLoading: false,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    }
    this.onScriptLoaded = this.onScriptLoaded.bind(this)
    this.onScriptError = this.onScriptError.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onScriptLoaded() {
    if (!PaymentForm.getStripeToken) {
      Stripe.setPublishableKey('pk_test_LYZ3KAstQTBHJk4vg7JoZ4q3')
      this.setState({ stripeLoading: false, stripeLoadingError: false })
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true })
  }

  onSubmit(event) {
    Stripe.setPublishableKey('pk_test_LYZ3KAstQTBHJk4vg7JoZ4q3')
    const self = this
    event.preventDefault()
    this.setState({ submitDisabled: true, paymentError: null })
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({
          paymentError: response.error.message,
          submitDisabled: false
        })
      } else {
        self.setState({
          paymentComplete: true,
          submitDisabled: false,
          token: response.id
        })
        self.props.sendPayment(self.state.token, self.props.user.id)
      }
    })
  }

  render() {
    console.log(this.props.user)
    if (this.state.stripeLoading) {
      return <div>Loading</div>
    } else if (this.state.stripeLoadingError) {
      return <div>Error</div>
    } else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>
    } else {
      return (
        <form onSubmit={this.onSubmit}>
          <span>{this.state.paymentError}</span>
          <br />
          <input
            type="text"
            data-stripe="number"
            placeholder="credit card number"
          />
          <br />
          <input
            type="text"
            data-stripe="exp-month"
            placeholder="expiration month"
          />
          <br />
          <input
            type="text"
            data-stripe="exp-year"
            placeholder="expiration year"
          />
          <br />
          <input type="text" data-stripe="cvc" placeholder="cvc" />
          <br />
          <input
            disabled={this.state.submitDisabled}
            type="submit"
            value="Purchase"
          />
        </form>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    sendPayment: (token, userId) => dispatch(sendPayment(token, userId))
  }
}

export default connect(mapState, mapDispatch)(PaymentForm)
