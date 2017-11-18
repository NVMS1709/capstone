import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './userInfo'
import UserEdit from './userEdit'
import CategoryMap from './categoryMap'

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
    return (
      <div>
        {this.state.userEdit ? <UserEdit /> : <UserInfo />}
        {this.state.userEdit ? (
          <button onClick={this.toggleEditView}>Close Drop Down</button>
        ) : (
          <button onClick={this.toggleEditView}>Edit Info</button>
        )}
        <CategoryMap />
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
