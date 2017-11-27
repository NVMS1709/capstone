import React, { Component } from 'react'
import MainTopics from './mainTopics'
import { connect } from 'react-redux'

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <MainTopics />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
export default connect(mapState)(Index)
