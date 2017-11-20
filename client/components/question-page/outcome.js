import React, { Component } from 'react'
import { connect } from 'react-redux'
import RawOutput from './rawOutput'
import Tests from './tests'

class Outcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '',
      outputMode: 'rawOutput',
    }
    this.handleOutputMode = this.handleOutputMode.bind(this);
  }

  handleOutputMode(event) {
    if (event.target.textContent === 'Raw Output') {
      this.setState({ outputMode: 'rawOutput' })
    }
    if (event.target.textContent === 'Tests') {
      this.setState({ outputMode: 'tests' })
    }

  }

  render() {
    return (
      <div>
        <div className="results-button-container">
          <button onClick={this.handleOutputMode} style={{ border: '1px solid black', borderBottom: 'none' }}>Raw Output</button>
          <button onClick={this.handleOutputMode}>Tests</button>
        </div>
        {
          this.state.outputMode === 'rawOutput'
            ? <RawOutput testResult={this.props.testResult} />
            : ''
        }
        {
          this.state.outputMode === 'tests'
            ? <Tests tests={this.props.currentQuestion.javascriptTestFile} />
            : ''
        }
      </div>
    )
  }

}

const mapState = state => ({
  testResult: state.testResult
})

export default connect(mapState, null)(Outcome)
