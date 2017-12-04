import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main } from './components'
import { me, fetchQuestions, fetchCategories, fetchDifficulties } from './store'
import QuestionPage from './components/question-page/index'
import HomePage from './components/home-page'
import UserPage from './components/user-account-page/index.js'
import UserAlgorithmSubmissionPage from './components/user-new-algorithm-submission-page/index.js'
import Payment from './components/payment/payment'
import Forum from './components/forum/index'
import Discussion from './components/forum/discussionIndex'
import Login from './components/auth-form'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super()
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth
    }
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  componentDidMount() {
    this.props.loadInitialData()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        {this.state.height <= 500 || this.state.width <= 800 ? (
          <div id="small-window">
            <div id="small-window-message-container">
              <div>
                Our web app does not support small browser windows yet :(
              </div>
              <div>
                Please enlarge your browser window or visit our web app on a
                larger device.
              </div>
              <div>We apologize for the inconvenience!</div>
              <div>▐ ﹒︣ Ĺ̯ ﹒︣ ▐</div>
              <div>┏༼ ◉ ╭╮ ◉༽┓</div>
              <div>(๑◕︵◕๑)</div>
              <div>٩꒰´·⌢•｀꒱۶⁼³₌₃</div>
              <div>( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )</div>
              <div>...好伤心, 我要哭了...</div>
            </div>
          </div>
        ) : (
            <Main>
              <Switch>
                {/* Routes placed here are available to all visitors */}
                <Route path="/home" component={HomePage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={HomePage} />
                {isLoggedIn && (
                  <Switch>
                    {/* Routes placed here are only available after logging in */}
                    <Route path="/home" component={HomePage} />
                    <Route
                      exact
                      path="/user-submission"
                      component={UserAlgorithmSubmissionPage}
                    />
                    <Route
                      exact
                      path="/user-submission/:questionName"
                      component={UserAlgorithmSubmissionPage}
                    />
                    <Route exact path="/" component={HomePage} />
                    <Route
                      path="/questions/:questionName"
                      component={QuestionPage}
                    />
                    <Route path="/user" component={UserPage} />
                    <Route path="/payment" component={Payment} />
                    <Route exact path="/forum" component={Forum} />
                    <Route path="/forum/:discussionName" component={Discussion} />
                  </Switch>
                )}

                {/* Displays our Login component as a fallback */}
                <Route path="/home" component={HomePage} />
              </Switch>
            </Main>
          )}
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchQuestions())
      dispatch(fetchCategories())
      dispatch(fetchDifficulties())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
