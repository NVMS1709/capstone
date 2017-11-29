import React, { Component } from 'react'
import AceEditor from './aceEditor'
import Outcome from './outcome'
import Instructions from './instruction'
import QuestionDescription from './question'
import { connect } from 'react-redux'
import Comments from './comments/index'
import { setCustomResult, setResult } from '../../store'
import Modal from '../modal'
import AuthForm from '../auth-form'

class QuestionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'Prompt',
      language: 'Javascript',
      loading: false
    }
    this.setMode = this.setMode.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: true }), 600)
  }

  componentWillUnmount() {
    this.props.setCustomResult([])
    this.props.setResult('')
  }

  setMode(event) {
    this.setState({ mode: event.target.textContent })
  }

  setLanguage(event) {
    this.setState({ language: event.target.textContent })
  }

  render() {
    const user = this.props.user
    console.log('OWNPROPS', this.props.ownProps)
    return (
      <div>
        {user.id ? (
          ''
        ) : (
          <div>
            {this.state.loading ? (
              <Modal>
                <AuthForm history={this.props.ownProps} />
              </Modal>
            ) : (
              ''
            )}
          </div>
        )}
        <div className="repl-container">
          <div className="left-container">
            {this.props.currentQuestion && (
              <div className="question-name">
                ➩ {this.props.currentQuestion.name} ({
                  this.props.currentQuestion.difficulty.name
                }{' '}
                difficulty)
              </div>
            )}
            <div className="instructions-button-container">
              <button
                onClick={this.setMode}
                style={
                  this.state.mode === 'Prompt'
                    ? { border: '1px solid black', borderBottom: 'none' }
                    : {}
                }
              >
                Prompt
              </button>
              {this.props.currentQuestion &&
              this.props.currentQuestion.jsWalkThrough.length > 1 ? (
                <button
                  onClick={this.setMode}
                  style={
                    this.state.mode === 'Instructions'
                      ? { border: '1px solid black', borderBottom: 'none' }
                      : {}
                  }
                >
                  Instructions
                </button>
              ) : (
                ''
              )}
            </div>
            {this.state.mode === 'Prompt' ? (
              <QuestionDescription
                currentQuestion={this.props.currentQuestion}
              />
            ) : (
              <Instructions currentQuestion={this.props.currentQuestion} />
            )}
          </div>
          <div className="right-container">
            <div className="language-buttons-container">
              <button
                onClick={this.setLanguage}
                style={
                  this.state.language === 'Javascript'
                    ? { backgroundColor: 'grey', color: 'white' }
                    : {}
                }
              >
                Javascript
              </button>
              {this.props.currentQuestion &&
              this.props.currentQuestion.pythonSolution.length > 0 ? (
                <button
                  onClick={this.setLanguage}
                  style={
                    this.state.language === 'Python'
                      ? { backgroundColor: 'grey', color: 'white' }
                      : {}
                  }
                >
                  Python
                </button>
              ) : (
                ''
              )}
            </div>
            <div className="solution-button-container">
              <button
                onClick={this.toggle}
                style={{ border: '1px solid black', borderBottom: 'none' }}
              >
                Solution
              </button>
            </div>
            <div className="top">
              {user.id || !this.state.loading ? (
                <AceEditor
                  currentQuestion={this.props.currentQuestion}
                  language={this.state.language.toLowerCase()}
                />
              ) : (
                ''
              )}
            </div>
            <div className="bottom">
              <Outcome
                currentQuestion={this.props.currentQuestion}
                language={this.state.language.toLowerCase()}
              />
            </div>
          </div>
        </div>
        <Comments currentQuestion={this.props.currentQuestion} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    ownProps: ownProps,
    user: state.user,
    currentQuestion:
      state.questions &&
      state.questions.find(
        question => question.name === ownProps.match.params.questionName
      )
  }
}

const mapDispatch = dispatch => {
  return {
    setResult: result => dispatch(setResult(result)),
    setCustomResult: result => dispatch(setCustomResult(result))
  }
}

export default connect(mapState, mapDispatch)(QuestionPage)
