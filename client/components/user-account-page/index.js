import React, { Component } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import UserInfo from './userInfo'
import UserEdit from './userEdit'
import CategoryMap from './categoryMap'
import UsersAlgos from './usersAlgos'
import FontAwesome from 'react-fontawesome'

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
      <div className="user-dashboard">
        <div className="user-form-layer-0">

          {this.state.userEdit ? (
            <button className="user-info-button" onClick={this.toggleEditView}>Go Back</button>
          ) : (
              <button className="user-info-button" onClick={this.toggleEditView}><FontAwesome name="cogs" size="3x" /></button>
            )}
          {this.state.userEdit ? <UserEdit /> : <UserInfo />}
        </div>
        <div className="user-form-layer-1">
          <CategoryMap />
          <UsersAlgos />
        </div>
        <button onClick={() => history.push('/user-submission')}>
          Submit Algorithm
        </button>
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
