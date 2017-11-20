import React, { Component } from 'react'
import AceEditor from './aceEditor'
import Outcome from './outcome'
import Instructions from './instruction'
import QuestionDescription from './question'
import { connect } from 'react-redux'

class QuestionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'Prompt',
      language: 'Javascript'
    }
    this.setMode = this.setMode.bind(this)
    this.setLanguage = this.setLanguage.bind(this)
  }

  setMode(event) {
    this.setState({ mode: event.target.textContent })
  }

  setLanguage(event) {
    this.setState({ language: event.target.textContent })
  }

  render() {
    return (
      <div className="repl-container">
        <div className="left-container">
          {this.props.currentQuestion && <div className="question-name">➩ {this.props.currentQuestion.name} ({this.props.currentQuestion.difficulty.name} difficulty)</div>}
          <div className="instructions-button-container">
            <button onClick={this.setMode} style={this.state.mode === 'Prompt' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Prompt</button>
            <button onClick={this.setMode} style={this.state.mode === 'Instructions' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Instructions</button>
          </div>
          {this.state.mode === 'Prompt'
            ? <QuestionDescription currentQuestion={this.props.currentQuestion} />
            : <Instructions currentQuestion={this.props.currentQuestion} />
          }
        </div>
        <div className="right-container">
          <div className="language-buttons-container">
            <button onClick={this.setLanguage} style={this.state.language === 'Javascript' ? { backgroundColor: 'grey', color: 'white' } : {}}>Javascript</button>
            <button onClick={this.setLanguage} style={this.state.language === 'Python' ? { backgroundColor: 'grey', color: 'white' } : {}}>Python</button>
          </div>
          <div className="solution-button-container">
            <button onClick={this.toggle} style={{ border: '1px solid black', borderBottom: 'none' }}>Solution</button>
          </div>
          <div className="top">
            <AceEditor currentQuestion={this.props.currentQuestion} language={this.state.language} />
          </div>
          <div className="bottom">
            <Outcome currentQuestion={this.props.currentQuestion} />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    currentQuestion: state.questions && state.questions.find(question => question.name === ownProps.match.params.questionName)
  }
}

export default connect(mapState, null)(QuestionPage)
