import React, { Component } from 'react'
import { connect } from 'react-redux'

import 'brace/mode/java'
import 'brace/theme/github'

class Outcome extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.userSubmissoin = ''
  }

  onChange(newValue) {
    console.log('change', newValue)
    this.userSubmission = newValue
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.getInput(this.userSubmission)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <AceEditor
          mode="java"
          theme="github"
          onChange={this.onChange}
          name="user-input"
          editorProps={{ $blockScrolling: true }}
        />
        <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }
}

export default connect(null, null)(Outcome)
