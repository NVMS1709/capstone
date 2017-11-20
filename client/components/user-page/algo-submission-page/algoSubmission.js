import React, { Component } from 'react'
import AceEditor from 'react-ace'
import { postNewAlgo } from '../../../store'
import { connect } from 'react-redux'
import 'brace/mode/javascript'
import 'brace/theme/github'

class reactAce extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onChangeSolution = this.onChangeSolution.bind(this)
    this.onChangeTestSpec = this.onChangeTestSpec.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.newAlgorithm = {}
  }

  onChange(event) {
    this.newAlgorithm[event.target.name] = event.target.value
  }

  onChangeSolution(newValue) {
    this.newAlgorithm.solution = newValue
  }

  onChangeTestSpec(newValue) {
    this.newAlgorithm.javascriptTestFile = newValue
  }

  onSubmit(event) {
    event.preventDefault()
    this.newAlgorithm.userId = this.props.user.id
    this.props.postNewAlgo(this.newAlgorithm)
  }

  render() {
    const categories = this.props && this.props.categories
    const divStyle = { width: 200 }
    return (
      <div className="code-editor">
        <form onSubmit={this.onSubmit}>
          <p>User Submitted Algorithm</p>
          <p>Question Name</p>
          <input
            name="name"
            onChange={this.onChange}
            placeholder="Enter Name"
            size="35"
            required
          />
          <p>Function Name</p>
          <input
            name="functionName"
            onChange={this.onChange}
            placeholder="Enter Name"
            size="35"
            required
          />
          <br />
          <p>Question Description</p>
          <textarea
            name="description"
            onChange={this.onChange}
            placeholder="Enter Description"
            required
          />
          <p>Difficulty Level</p>
          <select
            name="difficulty"
            required="required"
            style={divStyle}
            onChange={this.onChange}
          >
            <option>Select Difficulty Level</option>
            {['easy', 'medium', 'hard'].map(difficulty => {
              return <option key={difficulty}>{difficulty}</option>
            })}
          </select>
          <p>Category</p>
          <select name="categoryId" style={divStyle} onChange={this.onChange}>
            <option value="null">Select Category</option>
            {categories.map(category => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
          <div>
            <p>Enter Solution</p>
            <AceEditor
              mode="javascript"
              theme="github"
              onChange={this.onChangeSolution}
              name="solution"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <br />
          <div>
            <p>Enter Test Specs</p>
            <AceEditor
              mode="javascript"
              theme="github"
              required="required"
              onChange={this.onChangeTestSpec}
              name="testFile"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.categories,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    postNewAlgo: newAlgorithm => dispatch(postNewAlgo(newAlgorithm))
  }
}

export default connect(mapState, mapDispatch)(reactAce)
