import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewToggle: true
    }
    this.toggleView = this.toggleView.bind(this)
  }

  toggleView() {
    this.setState({ viewToggle: !this.state.viewToggle })
  }

  render() {
    const { handleSubmit, error } = this.props
    return (
      <div>
        {this.state.viewToggle ? (
          <div className="oauth-box">
            <div className="login-box">
              <div>
                <form onSubmit={handleSubmit} name="login">
                  <div className="inputs">
                    <label htmlFor="email">
                      <small>Email</small>
                    </label>
                    <input name="email" type="text" size="38" />
                    <label htmlFor="password">
                      <small>Password</small>
                    </label>
                    <input name="password" type="password" size="38" />
                  </div>
                  <div className="oauth-buttons">
                    <button style={{ width: 160, padding: 3 }} type="submit">
                      L o g i n
                    </button>
                  </div>
                  {error &&
                    error.response && (
                      <div className="error-handled">
                        {' '}
                        {error.response.data}{' '}
                      </div>
                    )}
                </form>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="/auth/github">
                  <img src="/github.png" style={{ height: 35 }} />
                </a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="/auth/google">
                  <img src="/google.png" style={{ height: 35.75 }} />
                </a>
              </div>
              <div className="not-user-sign-up">
                <span>Not a user? </span>
                <a className="toggle-view-auth-sign" onClick={this.toggleView}>
                  {' '}
                  Sign Up{' '}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="oauth-box">
            <div className="login-box">
              <div>
                <form onSubmit={handleSubmit} name="signup">
                  <div className="inputs">
                    <label htmlFor="email">
                      <small>Email</small>
                    </label>
                    <input name="email" type="text" size="38" />
                    <label htmlFor="password">
                      <small>Password</small>
                    </label>
                    <input name="password" type="password" size="38" />
                  </div>
                  <div className="oauth-buttons">
                    <button
                      style={{
                        backgroundColor: 'rgb(227, 227, 227)',
                        swidth: 160,
                        padding: 3
                      }}
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>

                  {error &&
                    error.response && (
                      <div className="error-handled">
                        {' '}
                        {error.response.data}{' '}
                      </div>
                    )}
                </form>
              </div>
              <div className="not-user-sign-up">
                <p>Already a User? </p>
                <p className="toggle-view-auth-sign" onClick={this.toggleView}>
                  {' '}
                  Sign In{' '}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapLogin, mapDispatch)(AuthForm)
export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
