import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserEdit from './userEdit'
import CompletedQuestions from './completed-questions'
import AuthoredQuestions from './authored-questions'
import ChangePassword from './password-change'
import { Link } from 'react-router-dom'


class UserPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editView: 'Account Info'
    }
    this.toggleEditView = this.toggleEditView.bind(this)
  }

  toggleEditView(event) {
    this.setState({ editView: event.target.textContent })
  }

  /*    eslint-disable complexity */
  render() {
    return (
      <div id="user-dashboard">
        <div id="user-dashboard-sidebar">
          <Link className="sidebar-link" to="/user/account info" onClick={this.toggleEditView} style={this.state.editView === 'Account Info' ? { textDecoration: 'underline' } : {}}>Account Info</Link>
          <Link className="sidebar-link" to="/user/completed questions" onClick={this.toggleEditView} style={this.state.editView === 'Completed Questions' ? { textDecoration: 'underline' } : {}}>Completed Questions</Link>
          <Link className="sidebar-link" to="/user/authored questions" onClick={this.toggleEditView} style={this.state.editView === 'Authored Questions' ? { textDecoration: 'underline' } : {}}>Authored Questions</Link>
          <Link className="sidebar-link" to="/user/change password" onClick={this.toggleEditView} style={this.state.editView === 'Change Password' ? { textDecoration: 'underline' } : {}}>Change Password</Link>
          <Link className="sidebar-link" to="/user-submission" onClick={this.toggleEditView} style={this.state.editView === 'Create Question' ? { textDecoration: 'underline' } : {}}>Create Question</Link>
        </div>
        <div id="user-setting-container">
          {
            this.state.editView === 'Account Info'
              ?
              <UserEdit />
              :
              ''
          }
          {
            this.state.editView === 'Completed Questions'
              ?
              <CompletedQuestions />
              :
              ''
          }
          {
            this.state.editView === 'Authored Questions'
              ?
              <AuthoredQuestions />
              :
              ''
          }
          {
            this.state.editView === 'Change Password'
              ?
              <ChangePassword />
              :
              ''
          }
        </div>
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

export default connect(mapState)(UserPage)
