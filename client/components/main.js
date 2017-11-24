import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { logout } from '../store'
import Modal from './modal'
import AuthForm from './auth-form'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { user, children, handleLogout, isLoggedIn } = this.props
    return (
      <div id="navbar-container">
        <div className="custom-right">
          {user.id ? (
            ''
          ) : (
            <Modal>
              <AuthForm />
            </Modal>
          )}
        </div>
        <nav>
          {
            <div className="navbar">
              <div className="navbar-left">
                <NavLink to="/about" className="link">
                  <span className="small-head">About</span>
                </NavLink>
                <NavLink to="/home" className="link">
                  <span className="small-head">Questions</span>
                </NavLink>
                <NavLink to="/payment" className="link">
                  <span className="small-head">Payment</span>
                </NavLink>
              </div>
              <div className="navbar-central">
                <NavLink to="/home" id="head-link">
                  <span id="head">A L G O R I T H M</span>
                </NavLink>
              </div>
              <div className="navbar-right">
                {isLoggedIn ? (
                  <div>
                    <NavLink to="/user" className="link" id="link-left-space">
                      <span className="small-head">USER</span>
                    </NavLink>
                    <NavLink
                      to="/homepage"
                      className="link"
                      id="link-left-space"
                      onClick={handleLogout}
                    >
                      <span className="small-head">LOG OUT</span>
                    </NavLink>
                  </div>
                ) : (
                  <div>
                    <NavLink to="/login" className="link" id="link-left-space">
                      <span className="small-head">LOG IN</span>
                    </NavLink>
                    <NavLink to="/signup" className="link">
                      <span className="small-head">SIGN UP</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          }
        </nav>
        {children}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
