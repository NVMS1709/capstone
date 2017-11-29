import React, { Component } from 'react'
import { postAlgorithmValidationInput, postUserAlgorithmQuestion, deleteUserAlgorithmQuestion } from '../../store'
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
            colorSaveButton: false,
            colorPublishButton: false,
            colorResetButton: false,
            colorDeleteButton: false,
            needDescription: false,
            needUniqueAlgorithmName: false,
            setInitialState: true,
            processingInfo: '',
            makeSure: ''
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
        this.onPublish = this.onPublish.bind(this)
        this.onReset = this.onReset.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.confirmOrCancel = this.confirmOrCancel.bind(this)
        this.handleOutputMode = this.handleOutputMode.bind(this)
        this.setAlgorithmFunctionName = this.setAlgorithmFunctionName.bind(this)
        this.setInitialStateOnSubmissionPage = this.setInitialStateOnSubmissionPage.bind(this)
    }

    setAlgorithmName(event) {
        const targetValue = event.target.value;

        (new Promise(resolve => {
            this.setState({
                needUniqueAlgorithmName: false,
                needAlgorithmName: false
            }, () => {
                resolve()
            })

        }))
            .then(() => new Promise(resolve => {

                this.setState({ algorithmName: targetValue },
                    () => {
                        resolve()
                    })

            }))
            .then(() => {
                if (!this.state.algorithmName) {
                    this.setState({ needAlgorithmName: true })
                } else if (this.props.questions.find(
                    question => question.name === this.state.algorithmName
                )) {
                    this.setState({ needUniqueAlgorithmName: true })
                }
            })
            .catch(err => {
                console.error(err)
            });

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
        const targetValue = event.target.value;

        (new Promise((resolve) => {
            this.setState({ algorithmFunctionName: targetValue }, () => {
                resolve()
            })
        }))
            .then(() => {
                if (!this.state.algorithmFunctionName) {
                    this.setState({ needFunctionName: true })
                } else {
                    this.setState({ needFunctionName: false })
                }
            });

    }

    setLocalDescriptionInput(event) {
        const targetValue = event.target.value;

        (new Promise(resolve => {
            this.setState({ localDescriptionInput: targetValue }, () => {
                resolve()
            })
        }))
            .then(() => {
                if (this.state.localDescriptionInput.length > 1000) {
                    this.setState({ needDescription: false })
                } else {
                    this.setState({ needDescription: true })
                }
            })
    }

    handleOutputMode(event) {
        if (event.target.textContent === 'Validation Test Output') {
            this.setState({ outputMode: 'ValidationCustomOutput' })
        } else if (event.target.textContent === 'Test Cases') {
            this.setState({ outputMode: 'TestCases' })
        } else if (event.target.textContent === 'Validation Detailed Output') {
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
            }, 50);

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

        if (this.state.algorithmName && !this.state.needUniqueAlgorithmName) {

            this.setState({ colorSaveButton: true })
            this.setState({ processingInfo: 'Saving...' })

            setTimeout(() => {
                this.setState({ colorSaveButton: false })
            }, 50);

            (new Promise(resolve => {
                resolve(
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
                )
            }))
                .then(updatedQuestion => {
                    if (updatedQuestion) {

                        setTimeout(() => {
                            (new Promise(resolve => {
                                this.setState({ processingInfo: 'SAVED' }, () => {
                                    resolve()
                                })
                            }))
                                .then(() => {
                                    setTimeout(() => {
                                        this.setState({ processingInfo: '' })
                                    }, 2000) //set to 2000ms, so the 'SAVED' message will display for 2000ms
                                })
                        }, 1000) // not a necessary setTimeout, set 1000ms to prolong the display of 'saving...' message for possibly better user experience

                    } else {
                        setTimeout(() => {
                            (new Promise(resolve => {
                                this.setState({ processingInfo: 'FAILED TO SAVE' }, () => {
                                    resolve()
                                })
                            }))
                                .then(() => {
                                    setTimeout(() => {
                                        this.setState({ processingInfo: '' })
                                    }, 2000) //set to 2000ms, so the 'SAVED' message will display for 2000ms
                                })
                        }, 1000) // not a necessary setTimeout, set 1000ms to prolong the display of 'saving...' message for possibly better user experience
                    }
                })
                .catch(error => {

                    setTimeout(() => {
                        (new Promise(resolve => {
                            this.setState({ processingInfo: 'FAILED TO SAVE' }, () => {
                                resolve()
                            })
                        }))
                            .then(() => {
                                setTimeout(() => {
                                    this.setState({ processingInfo: '' })
                                }, 2000)//set to 2000ms, so the 'SAVED' message will display for 2000ms 
                            })
                    }, 1000)// not a necessary setTimeout, set 1000ms to prolong the display of 'saving...' message for possibly better user experience

                    console.error(error)
                })

        } else if (!this.state.algorithmName) {
            this.setState({ needAlgorithmName: true })
        } else {
            this.setState({ needUniqueAlgorithmName: true })
        }

    }

    onPublish(event) {
        event.preventDefault()

        if (this.state.algorithmFunctionName
            && this.state.algorithmName
            && !this.state.needUniqueAlgorithmName
            && this.state.localDescriptionInput.length > 1000) {

            this.setState({ colorValidationButton: true })
            this.setState({ processingInfo: 'validating...' })

            setTimeout(() => {
                this.setState({ colorValidationButton: false })
            }, 50)

            this.setState({ colorPublishButton: true })

            setTimeout(() => {
                this.setState({ colorPublishButton: false })
            }, 50);

            (new Promise(resolve => {
                resolve(this.props.toPostAlgorithmValidationSubmission(
                    {
                        algorithmInput: this.state.localJavascriptAlgorithmInput,
                        language: this.state.algorithmLanguage,
                        functionName: this.state.algorithmFunctionName,
                        testFile: this.state.localJavascriptTestInput
                    },
                    this.props.user
                ))
            })).then(testCasesArr => {

                if (!testCasesArr.find(testCase => testCase.outcome === 'failed')) {

                    this.setState({ processingInfo: 'validated' });

                    (new Promise(resolve => {
                        setTimeout(() => {
                            this.setState({ processingInfo: 'publishing...' }, () => {
                                resolve()
                            })
                        }, 1000)
                    }))
                        .then(() => {
                            (new Promise(resolve => {
                                resolve(this.props.toPostUserAlgorithmQuestion({
                                    name: this.state.algorithmName,
                                    javascriptSolution: this.state.localJavascriptAlgorithmInput,
                                    functionName: this.state.algorithmFunctionName,
                                    javascriptTestFile: this.state.localJavascriptTestInput,
                                    description: this.state.localDescriptionInput,
                                    difficulty: this.state.algorithmDifficulty,
                                    category: this.state.algorithmCategory,
                                    published: true,
                                    userId: this.props.user.id,
                                    pythonTestFile: this.state.localPythonTestInput,
                                    pythonSolution: this.state.localPythonAlgorithmInput,
                                    existingId: this.props.currentQuestion && this.props.currentQuestion.id
                                }))
                            }))
                                .then(updatedQuestion => {
                                    if (updatedQuestion) {

                                        setTimeout(() => {
                                            (new Promise(resolve => {
                                                this.setState({ processingInfo: 'PUBLISHED' }, () => {
                                                    resolve()
                                                })
                                            }))
                                                .then(() => {
                                                    setTimeout(() => {
                                                        this.setState({ processingInfo: '' })
                                                    }, 2000) //same as above
                                                })
                                        }, 1000) //same as above

                                    } else {

                                        setTimeout(() => {
                                            (new Promise(resolve => {
                                                this.setState({ processingInfo: 'FAILED TO PUBLISH' }, () => {
                                                    resolve()
                                                })
                                            }))
                                                .then(() => {
                                                    setTimeout(() => {
                                                        this.setState({ processingInfo: '' })
                                                    }, 2000) //same as above
                                                })
                                        }, 1000) // same as above

                                    }
                                })
                                .catch(error => {
                                    setTimeout(() => {
                                        (new Promise(resolve => {
                                            this.setState({ processingInfo: 'FAILED TO PUBLISH' }, () => {
                                                resolve()
                                            })
                                        }))
                                            .then(() => {
                                                setTimeout(() => {
                                                    this.setState({ processingInfo: '' })
                                                }, 2000) // same as above
                                            })
                                    }, 1000) // same as above

                                    console.error(error)
                                })
                        })

                } else {

                    setTimeout(() => {
                        (new Promise(resolve => {
                            this.setState({ processingInfo: 'FAILED TO VALIDATE' }, () => {
                                resolve()
                            })
                        }))
                            .then(() => {
                                setTimeout(() => {
                                    this.setState({ processingInfo: '' })
                                }, 2000) // same as above
                            })
                    }, 1000) // same as above

                }
            })
                .catch(error => {

                    setTimeout(() => {
                        (new Promise(resolve => {
                            this.setState({ processingInfo: 'FAILED TO VALIDATE' }, () => {
                                resolve()
                            })
                        }))
                            .then(() => {
                                setTimeout(() => {
                                    this.setState({ processingInfo: '' })
                                }, 2000) //same as above
                            })
                    }, 1000) // same as above
                    console.error(error)
                });

            this.setState({ outputMode: 'ValidationCustomOutput' })

        } else {
            if (!this.state.algorithmFunctionName) {
                this.setState({ needFunctionName: true })
            }
            if (!this.state.algorithmName) {
                this.setState({ needAlgorithmName: true })
            }
            if (this.state.localDescriptionInput < 1000) {
                this.setState({ needDescription: true })
            }
            if (this.state.needUniqueAlgorithmName) {
                this.setState({ needUniqueAlgorithmName: true })
            }
        }
    }

    onReset(event) {
        event.preventDefault()

        this.setState({ colorResetButton: true })

        setTimeout(() => {
            this.setState({ colorResetButton: false })
        }, 50)

        this.setState({ makeSure: 'Are you sure to reset?' })

        setTimeout(() => {
            this.setState({ makeSure: '' })
        }, 20000)

    }

    onDelete(event) {
        event.preventDefault()

        this.setState({ colorDeleteButton: true })

        setTimeout(() => {
            this.setState({ colorDeleteButton: false })
        }, 50)

        this.setState({ makeSure: 'Are you sure to delete?' })

        setTimeout(() => {
            this.setState({ makeSure: '' })
        }, 20000)

    }

    confirmOrCancel(event) {

        if (
            event.target.value === 'Are you sure to reset?'
            && event.target.textContent === 'Confirm'
        ) {

            (new Promise(resolve => {
                this.setState({ processingInfo: 'resetting' }, () => {
                    resolve()
                })
            }))
                .then(() => {
                    return new Promise(resolve => {
                        resolve(
                            this.props.toPostUserAlgorithmQuestion({
                                name: this.state.algorithmName,
                                javascriptSolution: '',
                                functionName: '',
                                javascriptTestFile: '',
                                description: '',
                                difficulty: 'easy',
                                category: 'Arrays',
                                published: false,
                                userId: this.props.user.id,
                                pythonTestFile: '',
                                pythonSolution: '',
                                existingId: this.props.currentQuestion && this.props.currentQuestion.id
                            })
                        )
                    })
                })
                .then(() => {
                    (new Promise(resolve => {
                        setTimeout(() => {
                            this.setState({ processingInfo: 'RESETTED' }, () => {
                                resolve()
                            })
                        }, 1000)
                    }))
                        .then(() => {
                            setTimeout(() => {
                                this.setState({ processingInfo: '' })
                            }, 2000)
                        })
                })
                .catch((error) => {
                    (new Promise(resolve => {
                        setTimeout(() => {
                            this.setState({ processingInfo: 'FAILED TO RESET' }, () => {
                                resolve()
                            })
                        }, 1000)
                    }))
                        .then(() => {
                            setTimeout(() => {
                                this.setState({ processingInfo: '' })
                            }, 2000)
                        })
                    console.error(error)
                })
        }

        if (event.target.value === 'Are you sure to delete?' && event.target.textContent === 'Confirm') {
            (new Promise(resolve => {
                this.setState({ processingInfo: 'deleting...' }, () => {
                    resolve()
                })
            }))
                .then(() => {
                    return new Promise(resolve => {
                        resolve(
                            this.props.toDeleteUserAlgorithmQuestion(this.props.currentQuestion)
                        )
                    })
                })
                .then(() => {

                    //NEED TO REDIRECT TO user-submission with the message "DELETED", currently redirect to UNAUTHORIZED
                    (new Promise(resolve => {
                        setTimeout(() => {
                            this.setState({ processingInfo: 'DELETED' }, () => {
                                resolve()
                            })
                        }, 1000)
                    }))
                        .then(() => {
                            setTimeout(() => {
                                this.setState({ processingInfo: '' })
                            }, 2000)
                        })
                })
                .catch((error) => {
                    (new Promise(resolve => {
                        setTimeout(() => {
                            this.setState({ processingInfo: 'FAILED TO DELETE' }, ()=>{
                                resolve()
                            })
                        }, 1000)
                    }))
                        .then(() => {
                            setTimeout(() => {
                                this.setState({ processingInfo: '' })
                            }, 2000)
                        })
                    console.error(error)
                })
        }

        this.setState({ makeSure: '' })
    }

    setInitialStateOnSubmissionPage(resolve) {
        console.log('IN PROTOTYPE FUNCTION, BEFORE SETSTATE', this.state.algorithmDifficulty)
        this.setState({
            algorithmName: this.props.currentQuestion.name,
            algorithmCategory: this.props.currentQuestion.category.name,
            algorithmFunctionName: this.props.currentQuestion.functionName,
            localDescriptionInput: this.props.currentQuestion.description,
            localJavascriptTestInput: this.props.currentQuestion.javascriptTestFile,
            localJavascriptAlgorithmInput: this.props.currentQuestion.javascriptSolution,
            localPythonTestInput: this.props.currentQuestion.pythonTestFile,
            localPythonAlgorithmInput: this.props.currentQuestion.pythonSolution,
            algorithmDifficulty: this.props.currentQuestion.difficulty.name,
            setInitialState: false
        }, () => {
            console.log('IN PROTOTYPE FUNCTION, AFTER SETSTATE', this.state.algorithmDifficulty)
            resolve()
        })
    }


    /* eslint-disable complexity*/
    /* eslint-disable no-nested-ternary*/
    render() {

        const {
            difficulties,
            categories,
            validationCustomResult,
            validationResult,
            user,
            currentQuestion
        } = this.props

        const SubmissionPage = (
            <div id="submission-page" >
                <div id="submission-control-buttons-container">
                    <button
                        onClick={this.onSave}
                        style={this.state.colorSaveButton
                            ?
                            { backgroundColor: 'grey' }
                            :
                            {}}>
                        Save
                    </button>
                    <button
                        onClick={this.onReset}
                        style={this.state.colorResetButton
                            ?
                            { backgroundColor: 'grey' }
                            :
                            {}}>
                        Reset
                    </button>
                    <button
                        onClick={this.onPublish}
                        style={this.state.colorPublishButton
                            ?
                            { backgroundColor: 'grey' }
                            :
                            {}}>
                        Publish
                    </button>
                    <button
                        onClick={this.onDelete}
                        style={this.state.colorDeleteButton
                            ?
                            { backgroundColor: 'grey' }
                            :
                            {}}>
                        Delete
                    </button>
                    {this.state.processingInfo
                        ?
                        <button //not a real button, use button for easier CSS
                            id="processing-info"
                            style={this.state.processingInfo.includes('FAILED')
                                ?
                                {
                                    color: 'red'
                                }
                                :
                                this.state.processingInfo.includes('ing')
                                    ?
                                    {
                                        color: 'black'
                                    }
                                    :
                                    {
                                        color: 'green'
                                    }}>
                            {this.state.processingInfo}
                        </button>
                        :
                        ''
                    }
                    {this.state.makeSure
                        ?
                        <div>
                            <button //not a real button, use button for easier CSS
                                id="makesure">
                                {this.state.makeSure}
                            </button>
                            <button className="confirm-cancel" onClick={this.confirmOrCancel} value={this.state.makeSure}>Confirm</button>
                            <button className="confirm-cancel" onClick={this.confirmOrCancel} value={this.state.makeSure}>Cancel</button>
                        </div>
                        :
                        ''
                    }
                </div>
                <div id="question-info">
                    <div id="submission-info-form-container">
                        <div className="input-row">
                            <label>Name{
                                this.state.needAlgorithmName
                                    ?
                                    <span style={{ color: 'red' }}> required</span>
                                    :
                                    ''
                            }{
                                    this.state.needUniqueAlgorithmName
                                        ?
                                        <span style={{ color: 'red' }}> already taken</span>
                                        :
                                        ''
                                }
                            </label>
                            <input onChange={this.setAlgorithmName} value={this.state.algorithmName} />
                        </div>
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
                            <label>
                                Export Function Name (for both python and javascript)
                            {
                                    this.state.needFunctionName
                                        ?
                                        <span style={{ color: 'red' }}> required</span>
                                        :
                                        ''
                                }
                            </label>
                            <input onChange={this.setAlgorithmFunctionName} value={this.state.algorithmFunctionName} />
                        </div>
                    </div>
                    <div id="description-container">
                        <div id="description-title">
                            Description
                        {this.state.needDescription
                                ?
                                <span style={{ color: 'red' }}>
                                    1000 characters minimum
                             </span>
                                :
                                ''}
                        </div>
                        <div>
                            <textarea onChange={this.setLocalDescriptionInput} value={this.state.localDescriptionInput} />
                        </div>
                    </div>
                </div>
                <div id="solution-test-container">
                    <div id="submission-solution">
                        <div id="validate-button-container">
                            <button
                                onClick={this.onValidate}
                                style={this.state.colorValidationButton
                                    ?
                                    { backgroundColor: 'white' }
                                    :
                                    {}}>
                                ➩ Validate Solution
                            </button>
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
                            <button
                                onClick={this.handleOutputMode}
                                style={this.state.outputMode === 'TestCases'
                                    ?
                                    { border: '1px solid black', borderBottom: 'none' }
                                    :
                                    {}}>
                                Test Cases
                            </button>
                            <button
                                onClick={this.handleOutputMode}
                                style={this.state.outputMode === 'ValidationCustomOutput'
                                    ?
                                    { border: '1px solid black', borderBottom: 'none' }
                                    :
                                    {}}>
                                Validation Test Output
                            </button>
                            <button
                                onClick={this.handleOutputMode}
                                style={this.state.outputMode === 'ValidationRawOutput'
                                    ?
                                    { border: '1px solid black', borderBottom: 'none' }
                                    :
                                    {}}>
                                Validation Detailed Output
                            </button>
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
                                            <p
                                                key={result.title + ' ' + result.outcome}
                                                style={result.outcome === 'passed'
                                                    ?
                                                    { color: 'green' }
                                                    :
                                                    { color: 'red' }}>
                                                {result.title + ' ' + result.outcome}
                                            </p>
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
            </div >
        )


        /* eslint-disable no-nested-ternary */
        return (
            <div>
                {
                    /*
                    NOT A VERY GOOD PRACTICE!
                    Render methods should be a pure function of props and state.
                    Maybe we can move the logic to `componentDidMount`, but linter will complain!
                    however, we need to figure out how to make sure that
                    we only `this.setState()` after the field  `this.props.currentQuestion` is loaded
                    */
                    currentQuestion && currentQuestion.userId === user.id
                        ?
                        (() => {
                            if (this.state.setInitialState) {
                                (new Promise(resolve => {
                                    console.log('IN PROMISE BEFORE CALL PROTOTYPE FUNCTION', this.state.algorithmDifficulty)
                                    /*
                                    passing resolve to this.setInitialStateOnSubmissionPage, will resolve() in the callback of this.setState();
                                    in order to make sure that the submissionPage is rendered only after the the local state is initialized
                                    */
                                    this.setInitialStateOnSubmissionPage(resolve)
                                }))
                                    .then(() => {
                                        console.log('AFTER PROMISE RESOLVED', this.state.algorithmDifficulty)
                                        return SubmissionPage
                                    })
                            } else {
                                return SubmissionPage
                            }
                        })()
                        :
                        this.props.match.path === '/user-submission'
                            ?
                            SubmissionPage
                            :
                            <div>Unauthorized</div>
                }
            </div>
        )
    }
}

const mapState = (state, ownProps) => {
    return {
        questions: state.questions,
        user: state.user,
        categories: state.categories,
        difficulties: state.difficulties,
        validationResult: state.validationResult,
        validationCustomResult: state.validationCustomResult,
        currentQuestion: state.questions
            && state.questions
                .find(question => question.name === ownProps.match.params.questionName)
    }
}

const mapDispatch = dispatch => {
    return {
        toPostAlgorithmValidationSubmission: (submission, user) => (new Promise(resolve => {
            resolve(dispatch(
                postAlgorithmValidationInput(submission, user)
            ))
        }))
            .then(testCases => {
                return testCases
            }),
        toPostUserAlgorithmQuestion: questionSubmission => (new Promise(resolve => {
            resolve(dispatch(
                postUserAlgorithmQuestion(questionSubmission)
            ))
        }))
            .then(updatedQuestion => {
                return updatedQuestion
            }),
        toDeleteUserAlgorithmQuestion: question => (new Promise(resolve => {
            resolve(dispatch(deleteUserAlgorithmQuestion(question)))
        }))
            .then(() => {
                return
            })
    }
}

export default connect(mapState, mapDispatch)(UserAlgorithmSubmissionPage)
