import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userUpdate } from '../../store/index'

class UserEdit extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.input = {}
  }

  handleChange(event) {
    this.input[event.target.name] = event.target.value
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.userUpdate(this.props.user.id, this.input)
  }

  render() {
    return (
      <div>
        <form className="user-edit" onSubmit={this.handleSubmit}>
          <ul className="wrapper">
            <li className="form-row">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </li>
            <li className="form-row">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" />
            </li>
            <li className="form-row">
              <label htmlFor="password">Password</label>
              <input type="text" id="password" />
            </li>
            <li className="form-row">
              <button type="submit">Submit</button>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    userUpdate: (id, user) => dispatch(userUpdate(id, user))
  }
}

export default connect(mapState, mapDispatch)(UserEdit)
