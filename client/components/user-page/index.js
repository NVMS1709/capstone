import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './userInfo'
import UserEdit from './userEdit'

class UserIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEdit: false
    }
    this.toggleEditView = this.toggleEditView.bind(this)
  }

  toggleEditView() {
    this.setState({ userEdit: !this.state.userEdit })
  }

  render() {
    const gitGoogleBool = this.props.user.googleId || this.props.user.githubId
    console.log(this.props.categories)
    return (
      <div>
        {this.state.userEdit ? <UserEdit /> : <UserInfo />}
        {!gitGoogleBool ? (
          <button onClick={this.toggleEditView}>Edit Info</button>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    categories: state.categories
  }
}

export default connect(mapState)(UserIndex)
