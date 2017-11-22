import React, { Component } from 'react'
import { postAlgorithmInput } from '../../store'
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
      language: '',
      localDescriptionInput: '',
      localAlgorithmInput: '',
      result: '',
      outputMode: 'TestCases',
      localTestInput: '',
      algorithmCategory: '',
      algorithmDifficulty: '',
      algorithmLanguage: '',
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
    // event.preventDefault()
    // const submission = {
    //   algorithmInput: this.state.localAlgorithmInput,
    //   language: this.props.language.toLowerCase()
    // }
    // this.props.toPostValidateAlgorithmSubmission(
    //   submission,
    //   this.props.currentQuestion,
    //   this.props.user.questionsSolved
    // )
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
    const { difficulties, categories } = this.props

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
              <select onChange={this.setAlgorithmLanguage}>
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
              <button onClick={this.handleOutputMode} style={this.state.outputMode === 'ExampleTestCases' ? { border: '1px solid black', borderBottom: 'none' } : {}}>Example Test Cases</button>
            </div>
            {
              this.state.outputMode === 'TestCases'
                ? <div className="submission-test-code-editor">
                  <AceEditor
                    className="ace-test-editor"
                    mode={this.props.language}
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
              this.state.outputMode === 'ExampleTestCases'
                ? <div className="submission-test-code-editor">
                  <AceEditor
                    className="ace-test-editor"
                    mode={this.props.language}
                    theme="chrome"
                    value=""
                    name="test-example"
                    editorProps={{ $blockScrolling: true }}
                    width="100%"
                  />
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
    testResult: state.testResult,
    testCustomResult: state.testCustomResult,
  }
}

const mapDispatch = dispatch => {
  return {
    toPostAlgorithmInput: (submission, question, questionsSolved) =>
      dispatch(postAlgorithmInput(submission, question, questionsSolved))
  }
}

export default connect(mapState, mapDispatch)(UserAlgorithmSubmissionPage)
