import React, { Component } from 'react'
import { postAlgorithmValidationInput } from '../../store'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/python'
import 'brace/mode/javascript'
import 'brace/theme/chrome'

class UserAlgorithmSubmissionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      algorithmName: '',
      category: '',
      difficulty: '',
      localDescriptionInput: '',
      localAlgorithmInput: '',
      result: '',
      outputMode: 'TestCases',
      localTestInput: '',
      algorithmCategory: '',
      algorithmDifficulty: '',
      algorithmLanguage: 'javascript',
      algorithmFunctionName: ''
    }
    this.setAlgorithmName = this.setAlgorithmName.bind(this)
    this.setAlgorithmCategory = this.setAlgorithmCategory.bind(this)
    this.setAlgorithmDifficulty = this.setAlgorithmDifficulty.bind(this)
    this.setAlgorithmLanguage = this.setAlgorithmLanguage.bind(this)
    this.setLocalDescriptionInput = this.setLocalDescriptionInput.bind(this)
    this.onSolutionChange = this.onSolutionChange.bind(this)
    this.onTestChange = this.onTestChange.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.handleOutputMode = this.handleOutputMode.bind(this)
    this.setAlgorithmFunctionName = this.setAlgorithmFunctionName.bind(this)
  }

  setAlgorithmName(event) {
    this.setState({ algorithmName: event.target.value })
  }

  setAlgorithmCategory(event) {
    this.setState({ algorithmCategory: event.target.value })
  }

  setAlgorithmDifficulty(event) {
    this.setState({ algorithmDifficulty: event.target.value })
  }

  setAlgorithmLanguage(event) {
    this.setState({ algorithmLanguage: event.target.value })
  }

  setAlgorithmFunctionName(event) {
    this.setState({ algorithmFunctionName: event.target.value })
  }

  setLocalDescriptionInput(event) {
    this.setState({ localDescriptionInput: event.target.value })
  }

  onSolutionChange(newValue) {
    this.setState({ localAlgorithmInput: newValue })
  }

  onTestChange(newValue) {
    this.setState({ localTestInput: newValue })
  }

  onValidate(event) {
    event.preventDefault()
    if (this.state.algorithmFunctionName) {
      this.props.toPostAlgorithmValidationSubmission(
        {
          algorithmInput: this.state.localAlgorithmInput,
          language: this.state.algorithmLanguage,
          functionName: this.state.algorithmFunctionName,
          testFile: this.state.localTestInput
        },
        this.props.user
      )
    } else {
      console.log("I am desperate!!!!")
    }
  }

  handleOutputMode(event) {
    if (event.target.textContent === 'Validation Custom Output') {
      this.setState({ outputMode: 'ValidationCustomOutput' })
    } else if (event.target.textContent === 'Test Cases') {
      this.setState({ outputMode: 'TestCases' })
    } else if (event.target.textContent === 'Validation Raw Output') {
      this.setState({ outputMode: 'ValidationRawOutput' })
    }
  }

  render() {
    const { difficulties, categories, validationCustomResult, validationResult } = this.props

    return (
      <div id="submission-page" >
        <div id="submission-control-buttons-container">
          <button>Save</button>
          <button>Reset</button>
          <button>Publish</button>
          <button>Delete</button>
        </div>
        <div id="question-info">
          <div id="submission-info-form-container">
            <div className="input-row"><label>Name</label><input onChange={this.setAlgorithmName} value={this.state.algorithmName} /></div>
            <div className="input-row">
              <label>Category</label>
              <select onChange={this.setAlgorithmCategory}>
                {categories && categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Estimated Difficulty</label>
              <select onChange={this.setAlgorithmDifficulty}>
                {difficulties && difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.name}>{difficulty.name}</option>
                ))}
              </select>
            </div>
            <div className="input-row">
              <label>Language</label>
              <select onChange={this.setAlgorithmLanguage} value={this.state.algorithmLanguage}>
                <option value="python">python</option>
                <option value="javascript">javascript</option>
              </select>
            </div>
            <div className="input-row">
              <label>Entry Function Name</label>
              <input onChange={this.setAlgorithmFunctionName} value={this.state.algorithmFunctionName} />
            </div>
          </div>
          <div id="description-container">
            <div id="description-title">Description</div>
            <div>
              <textarea onChange={this.setLocalDescriptionInput} value={this.state.localDescriptionInput} />
            </div>
          </div>
        </div>
        <div id="solution-test-container">
          <div id="submission-solution">
            <div id="validate-button-container">
              <button onClick={this.onValidate}>Validate Solution</button>
            </div>
            <div id="submission-code-editor">
              <AceEditor
                className="ace-editor"
                mode={this.state.algorithmLanguage}
                theme="chrome"
                onChange={this.onSolutionChange}
                value={this.state.localAlgorithmInput}
                name="algorithm-input"
                editorProps={{ $blockScrolling: true }}
                width="100%"
              />
            </div>
          </div>
          <div id="test-solution">
            <div id="tests-button-container">
              <button onClick={this.handleOutputMode} style={this.state.outputMode === 'TestCases' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Test Cases</button>
              <button onClick={this.handleOutputMode} style={this.state.outputMode === 'ValidationCustomOutput' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Validation Custom Output</button>
              <button onClick={this.handleOutputMode} style={this.state.outputMode === 'ValidationRawOutput' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Validation Raw Output</button>
            </div>
            {
              this.state.outputMode === 'TestCases'
                ? <div className="submission-test-code-editor">
                  <AceEditor
                    className="ace-test-editor"
                    mode={this.state.algorithmLanguage}
                    theme="chrome"
                    onChange={this.onTestChange}
                    value={this.state.localTestInput}
                    name="test-input"
                    editorProps={{ $blockScrolling: true }}
                    width="100%"
                  />
                </div>
                : ''
            }
            {
              this.state.outputMode === 'ValidationCustomOutput'
                ? <div className="scroll-viewer" >
                  <pre className="raw-output">
                    {validationCustomResult.map(result => (
                      <p key={result.title + ' ' + result.outcome} style={result.outcome === 'passed' ? { color: 'green' } : { color: 'red' }}>{result.title + ' ' + result.outcome}</p>
                    )
                    )}
                  </pre>
                </div>
                : ''
            }
            {
              this.state.outputMode === 'ValidationRawOutput'
                ? <div className="scroll-viewer">
                  <pre className="raw-output">
                    {validationResult}
                  </pre>
                </div>
                : ''
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    categories: state.categories,
    difficulties: state.difficulties,
    validationResult: state.validationResult,
    validationCustomResult: state.validationCustomResult,

  }
}

const mapDispatch = dispatch => {
  return {
    toPostAlgorithmValidationSubmission: (submission, user) =>
      dispatch(postAlgorithmValidationInput(submission, user))
  }
}

export default connect(mapState, mapDispatch)(UserAlgorithmSubmissionPage)
