import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class HomePage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('[Homepage Categories]', this.props.categories)
        return (
            <div>
                HomePage, place all questions here.
          </div>
        )
    }
}

const mapState = (state) => {
    return {
        categories: state.categories
    }
}
const mapDispatch = null

export default connect(mapState, mapDispatch)(HomePage)

HomePage.propTypes = {
    categories: PropTypes.array.isRequired
}
