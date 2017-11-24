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
    return (
      <div
        style={{
          textAlign: 'center',
          height: 'calc(100vh - 70px - 40px - 30px - 40px)',
          border: '1px solid black',
          width: 'calc(40vw - 53px)',
          padding: '15px',
          fontSize: '13px',
          lineHeight: '25px',
          overflowY: 'scroll'
        }}
      >
        <div>
          <div>
            {this.state.index > 0 ? (
              <button
                style={{
                  borderRadius: '0',
                  float: 'left',
                  width: '120px',
                  marginTop: '3px'
                }}
                className="previous-hint"
                onClick={this.toggleDown}
              >
                See Previous Hint
              </button>
            ) : (
              ''
            )}
            {this.state.index > 0 ? (
              <button
                button
                stye={{
                  borderRadius: '0',
                  float: 'right',
                  rightMargin: '50%',
                  display: 'inline-block',
                  margin: '0 auto',
                  width: '100px',
                  marginTop: '3px'
                }}
                className="show-solution"
                onClick={this.toggleCodeView}
              >
                See Solution
              </button>
            ) : (
              <button
                button
                style={{
                  borderRadius: '0',
                  float: 'left',
                  width: '100px',
                  marginTop: '3px'
                }}
                className="show-solution"
                onClick={this.toggleCodeView}
              >
                See Solution
              </button>
            )}

            {this.state.index <
            this.props.currentQuestion.jsWalkThrough.length - 1 ? (
              <button
                style={{
                  borderRadius: '0',
                  float: 'right',
                  width: '100px',
                  marginTop: '3px'
                }}
                className="next-hint"
                onClick={this.toggleUp}
              >
                See Next Hint
              </button>
            ) : (
              ''
            )}
          </div>
          {this.state.codeView ? (
            ''
          ) : (
            <div>
              <br />
              <p style={{ textAlign: 'left' }}>
                {this.props.currentQuestion.jsWalkThrough[this.state.index]}
              </p>
            </div>
          )}
          {this.state.codeView ? (
            <div>
              <br />
              <pre style={{ textAlign: 'left' }}>
                {this.props.currentQuestion.jsSolutionWT[this.state.index]}
              </pre>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

export default connect(null)(InstructionMode)
