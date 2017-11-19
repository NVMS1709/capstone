import React, { Component } from 'react'
import AceEditor from 'react-ace'
import { getAlgorithmInput, postAlgorithmInput } from '../../store'
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
    this.props.toGetAlgorithmInput('')
  }

  onChange(newValue) {
    this.userSubmission = newValue
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.toGetAlgorithmInput(this.userSubmission)
    this.props.toPostAlgorithmInput(
      this.userSubmission,
      this.props.currentQuestion
    )
  }

  render() {
    return (
      <div>
        <div className="code-editor">
          <AceEditor
            mode="javascript"
            theme="github"
            onChange={this.onChange}
            name="user-input"
            editorProps={{ $blockScrolling: true }}
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
    toGetAlgorithmInput: userSubmission =>
      dispatch(getAlgorithmInput(userSubmission)),
    toPostAlgorithmInput: (userSubmission, question) =>
      dispatch(postAlgorithmInput(userSubmission, question))
  }
}

export default connect(mapState, mapDispatch)(reactAce)
