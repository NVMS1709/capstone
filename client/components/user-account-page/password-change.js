import React, { Component } from 'react'
import { connect } from 'react-redux'
import { passwordUpdate } from '../../store'

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            invalidPassword: false,
            processingInfo: ''
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const updatedpassword = event.target.newPassword.value

        if (event.target.newPassword.value.length > 6) {

            Promise.resolve(
                this.props.toUpdateUser(
                    this.props.user.id,
                    {
                        oldPassword: event.target.oldPassword.value,
                        password: event.target.newPassword.value
                    }
                )
            ).then((updatedUserOrError) => {
                if (updatedUserOrError.password && updatedUserOrError.password.length > 15) {
                    this.setState({ processingInfo: 'saved' })
                } else {
                    this.setState({ processingInfo: updatedUserOrError.message })
                }
            })

        } else {
            this.setState({ invalidPassword: true })
        }


    }


    render() {

        return (
            <div id="user-info-setting-container">
                <form onSubmit={this.handleSubmit}>
                    <div id="inputs-container">
                        <div className="form-row">
                            <label htmlFor="email">Old Password</label>
                            <input type="password" id="oldPassword" />
                        </div>
                        <div className="form-row">
                            <label htmlFor="password">New Password{this.state.invalidPassword ? <span style={{ color: 'red' }}> invalid password</span> : ''}</label>
                            <input id="newPassword" type="password" />
                        </div>
                        <div className="button-row">
                            <button type="submit">Save</button>
                            {this.state.processingInfo
                                ?
                                <button id="fake-button" style={this.state.processingInfo === 'saved' ? { color: 'green' } : { color: 'red' }}>{this.state.processingInfo}</button>
                                :
                                ''
                            }
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

const mapState = state => {
    return {
        questions: state.questions,
        user: state.user
    }
}

const mapDispatch = dispatch => {
    return {
        toUpdateUser: (id, user) => {
            return dispatch(passwordUpdate(id, user))
        }
    }
}

export default connect(mapState, mapDispatch)(ChangePassword)
