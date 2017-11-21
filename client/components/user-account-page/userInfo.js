import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserInfo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const user = this.props.user.name || this.props.user.email
    return (
      <div>
        <p>User: {user}</p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserInfo)
