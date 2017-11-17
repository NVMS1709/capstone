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
    this.props.getInput('')
  }

  onChange(newValue) {
    this.userSubmission = newValue
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.onGetAlgorithmInput(this.userSubmission)
    this.props.onPostAlgorithmInput(this.userSubmission)
    
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
    onGetAlgorithmInput: userSubmission => dispatch(getAlgorithmInput(userSubmission)),
    onPostAlgorithmInput: userSubmission => dispatch(postAlgorithmInput(userSubmission))
  }
}

export default connect(null, mapDispatch)(reactAce)
