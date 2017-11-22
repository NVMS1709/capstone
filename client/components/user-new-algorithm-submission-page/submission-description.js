import React, { Component } from 'react'
import { connect } from 'react-redux'

class SubmissionQuestionDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
            setLocalDescriptionInput: ''
        }
        this.setLocalDescriptionInput = this.setLocalDescriptionInput.bind(this)
    }

    setLocalDescriptionInput(event) {
        this.setState({ setLocalDescriptionInput: event.target.value })
    }

    render() {
        return (
            <div id="description-container">
                <div id="description-title">Description</div>
                <div>
                    <textarea onChange={this.setLocalDescriptionInput} />
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.user
    }
}

export default connect(mapState)(SubmissionQuestionDescription)
