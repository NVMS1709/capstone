import React, { Component } from 'react'
import { connect } from 'react-redux'

class InstructionMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      codeView: false
    }
    this.toggleUp = this.toggleUp.bind(this)
    this.toggleDown = this.toggleDown.bind(this)
    this.toggleCodeView = this.toggleCodeView.bind(this)
  }

  toggleUp() {
    if (this.state.index < this.props.currentQuestion.jsWalkThrough.length - 1) this.setState({ index: this.state.index + 1 })
    this.setState({ codeView: false })
  }

  toggleDown() {
    if (this.state.index > 0) this.setState({ index: this.state.index - 1 })
    this.setState({ codeView: false })
  }

  toggleCodeView() {
    this.setState({ codeView: !this.state.codeView })
  }

  render() {
    console.log('here')
    console.log(this.props.currentQuestion.jsWalkThrough)
    return (
      <div className="instructions-shell">
        <div>
          <div>
            {this.state.index > 0 ? (
              <button className="previous-hint" onClick={this.toggleDown}>
                See Previous Hint
              </button>
            ) : (
              ''
            )}
            <button
              button
              className="show-solution"
              onClick={this.toggleCodeView}
            >
              See Solution
            </button>
            {this.state.index <
            this.props.currentQuestion.jsWalkThrough.length - 1 ? (
              <button className="next-hint" onClick={this.toggleUp}>
                See Next Hint
              </button>
            ) : (
              ''
            )}
          </div>
          {this.state.codeView ? (
            ''
          ) : (
            <p>{this.props.currentQuestion.jsWalkThrough[this.state.index]}</p>
          )}
          {this.state.codeView ? (
            <pre>
              {this.props.currentQuestion.jsSolutionWT[this.state.index]}
            </pre>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

export default connect(null)(InstructionMode)
