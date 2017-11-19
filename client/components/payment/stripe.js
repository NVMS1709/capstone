import React from 'react'
import ReactScriptLoader from 'react-script-loader'
import createReactClass from 'create-react-class'
import store, { sendPayment } from '../../store/index'

const ReactScriptLoaderMixin = ReactScriptLoader.ReactScriptLoaderMixin

const PaymentForm = createReactClass({
  mixins: [ReactScriptLoaderMixin],

  getInitialState: function() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    }
  },

  getScriptURL: function() {
    return 'https://js.stripe.com/v2/'
  },

  onScriptLoaded: function() {
    if (!PaymentForm.getStripeToken) {
      Stripe.setPublishableKey('pk_test_LYZ3KAstQTBHJk4vg7JoZ4q3')

      this.setState({ stripeLoading: false, stripeLoadingError: false })
    }
  },

  onScriptError: function() {
    this.setState({ stripeLoading: false, stripeLoadingError: true })
  },

  onSubmit: function(event) {
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
        store.dispatch(sendPayment(self.state.token))
      }
    })
  },

  render: function() {
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
})

export default PaymentForm
