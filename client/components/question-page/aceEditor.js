import React, { Component } from 'react'
import AceEditor from 'react-ace'
import { getInput } from '../../store'
import { connect } from 'react-redux'

import 'brace/mode/javascript'
import 'brace/theme/github'

class reactAce extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.userSubmissoin = ''
  }

  componentWillUnmount() {
    this.props.getInput('')
  }

  onChange(newValue) {
    this.userSubmission = newValue
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.getInput(this.userSubmission)
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
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

const mapDispatch = dispatch => {
  return {
    getInput: userSubmission => dispatch(getInput(userSubmission))
  }
}

export default connect(null, mapDispatch)(reactAce)
