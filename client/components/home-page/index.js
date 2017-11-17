import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showQuestions: 0
        }
        this.showQuestions = this.showQuestions.bind(this)
        this.hideQuestions = this.hideQuestions.bind(this)
    }

    showQuestions(event) {
        event.preventDefault()
        this.setState({showQuestions: event.target.getAttribute("value")})
    }

    hideQuestions(event) {
        event.preventDefault()
        this.setState({showQuestions: 0})
    }

    render() {
        const { categories } = this.props
        return (
            <div className="box-container">
                {categories.map((category) => {
                    return (
                        <div value={category.id} key={category.id} onMouseEnter={this.showQuestions} onMouseLeave={this.hideQuestions} className="box">
                            <div value={category.id} className="title">{category.name}</div>
                            {(+this.state.showQuestions === category.id) ?
                                <div className="questions">
                                {category.questions.map(question => <div key={question.id}>{question.name}</div>)}</div>
                                : <div value={category.id} className="description">{category.description}</div>}
                        </div>
                    )
                })}
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
