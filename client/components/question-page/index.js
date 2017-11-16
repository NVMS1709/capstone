import React, { Component } from 'react'
import AceEditor from './aceEditor'
import Outcome from './outcome-container'
import InstructionMode from './instruction-mode-container'
import Question from './question-container'

export default class questionPage extends Component {
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
      <div>
        <Question />
        <AceEditor />
        {this.state.componentToggle ? <Outcome /> : <InstructionMode />}
        {this.state.componentToggle ? (
          <button onClick={this.toggle}>Instructional Mode</button>
        ) : (
          <button onClick={this.toggle}>Solution Mode</button>
        )}
      </div>
    )
  }
}
