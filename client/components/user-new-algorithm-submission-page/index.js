import React, { Component } from 'react'
import { postAlgorithmValidationInput, postUserAlgorithmQuestion } from '../../store'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import 'brace/mode/python'
import 'brace/mode/javascript'
import 'brace/theme/chrome'
import { setTimeout } from 'timers';

class UserAlgorithmSubmissionPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            algorithmName: '',
            localDescriptionInput: '',
            localJavascriptAlgorithmInput: '',
            localPythonAlgorithmInput: '',
            result: '',
            outputMode: 'TestCases',
            localJavascriptTestInput: '',
            localPythonTestInput: '',
            algorithmCategory: 'Arrays',
            algorithmDifficulty: 'easy',
            algorithmLanguage: 'javascript',
            algorithmFunctionName: '',
            needFunctionName: false,
            needAlgorithmName: false,
            colorValidationButton: false,
            needDescription: false
        }

        this.setAlgorithmName = this.setAlgorithmName.bind(this)
        this.setAlgorithmCategory = this.setAlgorithmCategory.bind(this)
        this.setAlgorithmDifficulty = this.setAlgorithmDifficulty.bind(this)
        this.setAlgorithmLanguage = this.setAlgorithmLanguage.bind(this)
        this.setLocalDescriptionInput = this.setLocalDescriptionInput.bind(this)
        this.onSolutionChange = this.onSolutionChange.bind(this)
        this.onTestChange = this.onTestChange.bind(this)
        this.onValidate = this.onValidate.bind(this)
        this.onSave = this.onSave.bind(this)
        this.handleOutputMode = this.handleOutputMode.bind(this)
        this.setAlgorithmFunctionName = this.setAlgorithmFunctionName.bind(this)
        this.setInitialStateOnSubmissionPage = this.setInitialStateOnSubmissionPage.bind(this)
    }

    setAlgorithmName(event) {

        const promisifiedSetAlgorithmName = new Promise((resolve) => {
            resolve(this.setState({ algorithmName: event.target.value }))
        })

        promisifiedSetAlgorithmName.then(() => {
            if (!this.state.algorithmName) {
                this.setState({ needAlgorithmName: true })
            } else {
                this.setState({ needAlgorithmName: false })
            }
        })

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

        const promisifiedSetFunctionName = new Promise((resolve) => {
            resolve(this.setState({ algorithmFunctionName: event.target.value }))
        })

        promisifiedSetFunctionName.then(() => {
            if (!this.state.algorithmFunctionName) {
                this.setState({ needFunctionName: true })
            } else {
                this.setState({ needFunctionName: false })
            }
        })

    }

    setLocalDescriptionInput(event) {
        this.setState({ localDescriptionInput: event.target.value })
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

    onSolutionChange(newValue) {
        if (this.state.algorithmLanguage === 'javascript') {
            this.setState({ localJavascriptAlgorithmInput: newValue })
        } else {
            this.setState({ localPythonAlgorithmInput: newValue })
        }
    }

    onTestChange(newValue) {
        if (this.state.algorithmLanguage === 'javascript') {
        this.setState({ localJavascriptTestInput: newValue })
        } else {
            this.setState({ localPythonTestInput: newValue })
        }
    }

    onValidate(event) {

        event.preventDefault()

        if (this.state.algorithmFunctionName) {

            this.setState({ colorValidationButton: true })

            setTimeout(() => {
                this.setState({ colorValidationButton: false })
            }, 50)

            this.props.toPostAlgorithmValidationSubmission(
                {
                    algorithmInput: this.state.localJavascriptAlgorithmInput,
                    language: this.state.algorithmLanguage,
                    functionName: this.state.algorithmFunctionName,
                    testFile: this.state.localJavascriptTestInput
                },
                this.props.user
            )

            this.setState({ outputMode: 'ValidationCustomOutput' })

        } else {
            this.setState({ needFunctionName: true })
        }
    }

    onSave(event) {
        event.preventDefault()

        if (this.state.algorithmName) {

            this.props.toPostUserAlgorithmQuestion({
                name: this.state.algorithmName,
                javascriptSolution: this.state.localJavascriptAlgorithmInput,
                functionName: this.state.algorithmFunctionName,
                javascriptTestFile: this.state.localJavascriptTestInput,
                description: this.state.localDescriptionInput,
                difficulty: this.state.algorithmDifficulty,
                category: this.state.algorithmCategory,
                published: false,
                userId: this.props.user.id,
                pythonTestFile: this.state.localPythonTestInput,
                pythonSolution: this.state.localPythonAlgorithmInput,
                existingId: this.props.currentQuestion && this.props.currentQuestion.id
            })

        } else {
            this.setState({ needAlgorithmName: true })
        }
    }

    setInitialStateOnSubmissionPage() {
        this.setState({
            algorithmName: this.props.currentQuestion.name,
            algorithmCategory: this.props.currentQuestion.category.name,
            algorithmFunctionName: this.props.currentQuestion.functionName,
            localDescriptionInput: this.props.currentQuestion.description,
            localJavascriptTestInput: this.props.currentQuestion.javascriptTestFile,
            localJavascriptAlgorithmInput: this.props.currentQuestion.javascriptSolution,
            localPythonTestInput: this.props.currentQuestion.pythonTestFile,
            localPythonAlgorithmInput: this.props.currentQuestion.pythonSolution,
            algorithmDifficulty: this.props.currentQuestion.difficulty.name
        })
    }

    /* eslint-disable complexity */
    render() {

        const { difficulties, categories, validationCustomResult, validationResult, user, currentQuestion } = this.props
        console.log("CURRENT QUESTION", currentQuestion)

        const SubmissionPage = (
            <div id="submission-page" >
                <div id="submission-control-buttons-container">
                    <button onClick={this.onSave}>Save</button>
                    <button>Reset</button>
                    <button>Publish</button>
                    <button>Delete</button>
                </div>
                <div id="question-info">
                    <div id="submission-info-form-container">
                        <div className="input-row"><label>Name{this.state.needAlgorithmName ? <span style={{ color: 'red' }}> required</span> : ''}</label><input onChange={this.setAlgorithmName} value={this.state.algorithmName} /></div>
                        <div className="input-row">
                            <label>Category</label>
                            <select onChange={this.setAlgorithmCategory} value={this.state.algorithmCategory}>
                                {categories && categories.map(category => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="input-row">
                            <label>Estimated Difficulty</label>
                            <select onChange={this.setAlgorithmDifficulty} value={this.state.algorithmDifficulty}>
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
                            <label>Export Function Name{this.state.needFunctionName ? <span style={{ color: 'red' }}> required</span> : ''}</label>
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
                            <button onClick={this.onValidate} style={this.state.colorValidationButton ? { backgroundColor: 'green' } : {}}>Validate Solution</button>
                        </div>
                        <div id="submission-code-editor">
                            <AceEditor
                                className="ace-editor"
                                mode={this.state.algorithmLanguage}
                                theme="chrome"
                                onChange={this.onSolutionChange}
                                value={this.state[`local${this.state.algorithmLanguage[0].toUpperCase() + this.state.algorithmLanguage.slice(1)}AlgorithmInput`]}
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
                                ? <div id="submission-test-code-editor">
                                    <AceEditor
                                        className="ace-test-editor"
                                        mode={this.state.algorithmLanguage}
                                        theme="chrome"
                                        onChange={this.onTestChange}
                                        value={this.state[`local${this.state.algorithmLanguage[0].toUpperCase() + this.state.algorithmLanguage.slice(1)}TestInput`]}
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

        /* eslint-disable no-nested-ternary */
        return (
            <div>
                {
                    /* NOT A VERY GOOD PRACTICE!
                    Render methods should be a pure function of props and state.
                    Maybe we can move the logic to `componentWillMount`;
                    however, we need to figure out how to make sure that
                    we only `this.setState()` after the field  `this.props.currentQuestion` is loaded */
                    currentQuestion && currentQuestion.userId === user.id
                        ?
                        (function setPage() {
                            if (!this.state.algorithmName) {
                                (new Promise(resolve => {
                                    resolve(this.setInitialStateOnSubmissionPage())
                                })).then(() => {
                                    return SubmissionPage
                                })
                                    .catch(err => {
                                        console.error(err)
                                    })
                            } else {
                                return SubmissionPage
                            }
                        }).bind(this)()
                        :
                        currentQuestion
                            ?
                            <div>Unauthorized</div>
                            :
                            SubmissionPage
                }
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    return {
        user: state.user,
        categories: state.categories,
        difficulties: state.difficulties,
        validationResult: state.validationResult,
        validationCustomResult: state.validationCustomResult,
        currentQuestion: state.questions
            && state.questions.find(question => question.name === ownProps.match.params.questionName)
    }
}

const mapDispatch = dispatch => {
    return {
        toPostAlgorithmValidationSubmission: (submission, user) =>
            dispatch(postAlgorithmValidationInput(submission, user)),
        toPostUserAlgorithmQuestion: (questionSubmission) =>
            dispatch(postUserAlgorithmQuestion(questionSubmission))
    }
}

export default connect(mapState, mapDispatch)(UserAlgorithmSubmissionPage)
