import React, { Component } from 'react'
import { connect } from 'react-redux'
import RawOutput from './rawOutput'
import CustomOutput from './customOutput'

import Tests from './tests'

class Outcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '',
      outputMode: 'customOutput'
    }
    this.handleOutputMode = this.handleOutputMode.bind(this)
  }

  handleOutputMode(event) {
    if (event.target.textContent === 'Raw Output') {
      this.setState({ outputMode: 'rawOutput' })
    }
    if (event.target.textContent === 'Tests') {
      this.setState({ outputMode: 'tests' })
    }
    if (event.target.textContent === 'Custom Output') {
      this.setState({ outputMode: 'customOutput' })
    }
  }

  render() {
    return (
      <div>
        <div className="results-button-container">
          <button
            onClick={this.handleOutputMode}
            style={
              this.state.outputMode === 'customOutput'
                ? { border: '1px solid black', borderBottom: 'none' }
                : {}
            }
          >
            Custom Output
          </button>
          <button
            onClick={this.handleOutputMode}
            style={
              this.state.outputMode === 'rawOutput'
                ? { border: '1px solid black', borderBottom: 'none' }
                : {}
            }
          >
            Raw Output
          </button>
          <button
            onClick={this.handleOutputMode}
            style={
              this.state.outputMode === 'tests'
                ? { border: '1px solid black', borderBottom: 'none' }
                : {}
            }
          >
            Tests
          </button>
        </div>
        {this.state.outputMode === 'customOutput' ? (
          <CustomOutput
            tests={this.props.currentQuestion}
            testResult={this.props.testCustomResult}
          />
        ) : (
          ''
        )}
        {this.state.outputMode === 'rawOutput' ? (
          <RawOutput
            testResult={this.props.testResult}
            color={
              this.props.testCustomResult.length === 0
                ? 'black'
                : this.props.testCustomResult.find(
                    test => test.outcome === 'failed'
                  )
                  ? 'red'
                  : 'green'
            }
          />
        ) : (
          ''
        )}
        {this.state.outputMode === 'tests' ? (
          <Tests
            tests={this.props.currentQuestion[`${this.props.language}TestFile`]}
            language={this.props.language}
          />
        ) : (
          ''
        )}
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

export default connect(mapState, null)(Outcome)
