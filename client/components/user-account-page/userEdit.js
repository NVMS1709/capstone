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
        <form onSubmit={this.handleSubmit}>
          <p>User Name</p>
          <input
            name="name"
            onChange={this.handleChange}
            placeholder="Enter Name"
          />
          <p>User Email</p>
          <input
            name="email"
            onChange={this.handleChange}
            placeholder="Enter Email"
          />
          <p>Password</p>
          <input
            name="password"
            onChange={this.handleChange}
            placeholder="Enter Email"
          />
          <br />
          <button type="submit">Submit</button>
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
