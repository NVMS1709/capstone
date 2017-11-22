import React, { Component } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'

import 'brace/mode/python'
import 'brace/mode/javascript'
import 'brace/theme/chrome'

class SubmissionTests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '',
      outputMode: 'TestCases',
    }
    this.handleOutputMode = this.handleOutputMode.bind(this);
  }

  handleOutputMode(event) {
    if (event.target.textContent === 'Example Test Cases') {
      this.setState({ outputMode: 'TestCases' })
    }
    if (event.target.textContent === 'Test Cases') {
      this.setState({ outputMode: 'ExampleTestCases' })
    }
  }

  render() {
    return (
      <div id="test-solution">
        <div id="tests-button-container">
          <button onClick={this.handleOutputMode} style={this.state.outputMode === 'TestCases' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Test Cases</button>
          <button onClick={this.handleOutputMode} style={this.state.outputMode === 'ExampleTestCases' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Example Test Cases</button>
        </div>
        {
          this.state.outputMode === 'TestCases'
            ? <div className="submission-test-code-editor">
              <AceEditor
                className="ace-test-editor"
                mode={this.props.language}
                theme="chrome"
                onChange={this.onChange}
                value={this.state.localAlgorithmInput}
                name="user-input"
                editorProps={{ $blockScrolling: true }}
                width="100%"
              />
            </div>
            : ''
        }
        {
          this.state.outputMode === 'ExampleTestCases'
            ? <div className="submission-test-code-editor">
              <AceEditor
                className="ace-test-editor"
                mode={this.props.language}
                theme="chrome"
                onChange={this.onChange}
                value={this.state.localAlgorithmInput}
                name="user-input"
                editorProps={{ $blockScrolling: true }}
                width="100%"
              />
            </div>
            : ''
        }
      </div>
    )
  }

}

const mapState = state => {
  return {
    testResult: state.testResult,
    testCustomResult: state.testCustomResult,
    user: state.user
  }
}

export default connect(mapState, null)(SubmissionTests)
