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
        <MainTopics location={this.props.location} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  console.log(ownProps)
  return {
    user: state.user,
    location: ownProps
  }
}
export default connect(mapState)(Index)
