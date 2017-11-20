import React, { Component } from 'react'
import AceEditor from 'react-ace'
import { getAlgorithmInput, postAlgorithmInput } from '../../store'
import { connect } from 'react-redux'

import 'brace/mode/python'
import 'brace/mode/javascript'
import 'brace/theme/chrome'

class reactAce extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      localAlgorithmInput: ''
    }
  }

  onChange(newValue) {
    this.setState({ localAlgorithmInput: newValue })
  }

  onSubmit(event) {
    event.preventDefault()
    const submission = {
      algorithmInput: this.state.localAlgorithmInput,
      language: this.props.language.toLowerCase()
    }
    this.props.toPostAlgorithmInput(
      submission,
      this.props.currentQuestion
    )
  }

  render() {
    return (
      <div className="within-top">
        <div className="code-editor">
          <AceEditor
            className="ace-editor"
            mode={this.props.language.toLowerCase()}
            theme="chrome"
            onChange={this.onChange}
            value={this.state.localAlgorithmInput}
            name="user-input"
            editorProps={{ $blockScrolling: true }}
            width="100%"
          />
        </div>
        <div className="run-button-container">
          <button onClick={this.onSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    questions: state.questions
  }
}

const mapDispatch = dispatch => {
  return {
    toPostAlgorithmInput: (submission, question) =>
      dispatch(postAlgorithmInput(submission, question))
  }
}

export default connect(mapState, mapDispatch)(reactAce)
