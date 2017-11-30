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
    //console.log('AUTH', this.props && this.props.history.location.pathname)
    const currentLocation = this.props && this.props.history.location.pathname
    const { handleSubmit, error } = this.props
    return (
      <div>
        {this.state.viewToggle ? (
          <div className="oauth-box">
            <div className="login-box">
              <div>
                <form
                  onSubmit={event => {
                    event.preventDefault()
                    handleSubmit(event, this.props.history.location.pathname)
                  }}
                  name="login"
                >
                  <div className="inputs">
                    <div className="modal-input-row">
                      <label className="modal-input-label" htmlFor="email">Email</label>
                      <input name="email" type="text" size="38" />
                    </div>
                    <div className="modal-input-row">
                      <label className="modal-input-label" htmlFor="password">Password</label>
                      <input name="password" type="password" size="38" />
                    </div>
                  </div>
                  <div id="modal-login-button-container">
                    <button id="modal-login-button" type="submit">
                      LOGIN
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
                <a className="OAuth-buttons-container" href="/auth/github">
                  <img src="/GitHub-Mark-64px.png" style={{ maxHeight: 25, maxWidth: 25 }} />
                  <div className="OAuth-content">Sign in with Github</div>
                </a>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a className="OAuth-buttons-container" href="/auth/google">
                  <img src="https://developers.google.com/site-assets/logo-google-g.svg" style={{ maxHeight: 25, maxWidth: 25 }} />
                  <div className="OAuth-content">Sign in with Google</div>
                </a>
              </div>
              <div className="not-user-sign-up">
                <a className="toggle-view-auth-sign" onClick={this.toggleView}>
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        ) : (
            <div className="oauth-box">
              <div className="login-box">
                <div>
                  <form
                    onSubmit={event => {
                      event.preventDefault()
                      handleSubmit(event, this.props.history.location.pathname)
                    }}
                    name="signup"
                  >
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
                  <p className="toggle-view-auth-sign" onClick={this.toggleView}>
                    Sign In
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
    handleSubmit(evt, currentLocation) {
      //evt.preventDefault()
      //console.log('SUB', currentLocation)
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, currentLocation))
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
