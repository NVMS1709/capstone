import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userUpdate } from '../../store'
import { validateEmail } from './util'

class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      canModify: false,
      invalidPassword: false,
      invalidEmail: false,
      invalidName: false,
      processingInfo: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const updatedName = event.target.name.value

    if (validateEmail(event.target.email.value) && event.target.name.value.length > 3 && event.target.password.value) {

      Promise.resolve(
        this.props.toUpdateUser(
          this.props.user.id,
          {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
          }
        )
      ).then((updatedUserOrError) => {
        if (updatedUserOrError.name === updatedName) {
          this.setState({ processingInfo: 'saved' })
        } else {
          this.setState({ processingInfo: updatedUserOrError.message })
        }
      })

    } else {
      if (!validateEmail(event.target.email.value)) {
        this.setState({ invalidEmail: true })
      }
      if (event.target.name.value.length <= 3) {
        this.setState({ invalidName: true })
      }
      if (!event.target.password.value.length) {
        this.setState({ invalidPassword: true })
      }
    }

  }

  render() {
    return (
      <div id="user-info-setting-container">
        {this.state.canModify
          ?
          <form onSubmit={this.handleSubmit}>
            <div id="inputs-container">
              <div className="form-row">
                <label htmlFor="username">Name{this.state.invalidName ? <span style={{ color: 'red' }}> invalid name</span> : ''}</label>
                <input type="text" id="name" />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email{this.state.invalidEmail ? <span style={{ color: 'red' }}> invalid email</span> : ''}</label>
                <input type="text" id="email" />
              </div>
              <div className="form-row">
                <label htmlFor="password">Enter Password{this.state.invalidPassword ? <span style={{ color: 'red' }}> required</span> : ''}</label>
                <input id="password" type="password" />
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
          :
          <div id="inputs-container">
            <div className="form-row">
              <label>Name</label>
              <input readOnly value={this.props.user.name} style={{ border: '1px solid grey', color: 'grey' }} />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input readOnly value={this.props.user.email} style={{ border: '1px solid grey', color: 'grey' }} />
            </div>
            <div className="form-row">
              <button onClick={() => { this.setState({ canModify: true }) }}>Modify</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    passwordCheck: state.passwordCheck
  }
}

const mapDispatch = dispatch => {
  return {
    toUpdateUser: (id, user) => {
      return dispatch(userUpdate(id, user))
    }
  }
}

export default connect(mapState, mapDispatch)(UserEdit)
