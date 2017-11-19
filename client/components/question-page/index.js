import React, { Component } from 'react'
import AceEditor from './aceEditor'
import Outcome from './outcome'
import InstructionMode from './instruction'
import QuestionDescription from './question'
import { connect } from 'react-redux'

class questionPage extends Component {
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
        <div className="question-info-container">
          <QuestionDescription currentQuestion={this.props.currentQuestion} />
        </div>
        <div className="mode-button-container">{this.state.componentToggle
          ? (<button onClick={this.toggle}>Instructional Mode</button>)
          : (<button onClick={this.toggle}>Solution Mode</button>)}
        </div>
        <div className="my-repl">
          <div className="left">
            <AceEditor currentQuestion={this.props.currentQuestion} />
          </div>
          <div className="right">
            {this.state.componentToggle ? <Outcome currentQuestion={this.props.currentQuestion} /> : <InstructionMode />}
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

export default connect(mapState, null)(questionPage)
