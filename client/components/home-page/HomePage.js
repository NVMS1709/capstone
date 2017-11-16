import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class HomePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                HomePage, place all questions here.
          </div>
        )
    }
}

const mapState = (state) => {
    return {
        questions: state.questions
    }
}
const mapDispatch = null

export default connect(mapState, mapDispatch)(HomePage)

Routes.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}