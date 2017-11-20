import React, { Component } from 'react'
import AceEditor from './aceEditor'
import Outcome from './outcome'
import InstructionMode from './instruction'
import QuestionDescription from './question'
import { connect } from 'react-redux'

class QuestionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      componentToggle: true
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ componentToggle: !this.state.componentToggle })
  }

  render() {
    return (
      <div className="repl-container">
        <div className="left-container">
          {this.props.currentQuestion && <div className="question-name">➩ {this.props.currentQuestion.name} ({this.props.currentQuestion.difficulty} difficulty)</div>}
          <div className="instructions-button-container">
            <button onClick={this.toggle} style={{ border: '1px solid black', borderBottom: 'none' }}>Prompt</button>
            <button onClick={this.toggle}>Instructions</button>
          </div>
          <QuestionDescription currentQuestion={this.props.currentQuestion} />
        </div>
        <div className="right-container">
          <div className="language-buttons-container">
            <button>Javascript</button>
            <button>Python</button>
          </div>
          <div className="solution-button-container">
            <button onClick={this.toggle} style={{ border: '1px solid black', borderBottom: 'none' }}>Solution</button>
          </div>
          <div className="top">
            <AceEditor currentQuestion={this.props.currentQuestion} />
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
