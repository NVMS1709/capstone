import React from 'react'
import AlgoSubmission from './algoSubmission'
import { connect } from 'react-redux'

const algoSubmit = () => {
  return (
    <div className="repl-container">
      <div className="my-repl">
        <div className="left">
          <AlgoSubmission />
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(algoSubmit)
