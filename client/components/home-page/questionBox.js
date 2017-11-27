import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class QuestionBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showQuestions: 0,
            groupBy: 'Group by Category'
        }

        this.showQuestions = this.showQuestions.bind(this)
        this.hideQuestions = this.hideQuestions.bind(this)
        this.setGroupBy = this.setGroupBy.bind(this)
    }

    setGroupBy(event) {
        this.setState({ groupBy: event.target.textContent })
    }

    showQuestions(event) {
        event.preventDefault()
        this.setState({ showQuestions: event.target.getAttribute('value') })
    }

    hideQuestions(event) {
        event.preventDefault()
        this.setState({ showQuestions: 0 })
    }

    render() {

        let { categories, difficulties } = this.props

        categories = categories.map(category => {
            category.questions = category.questions.filter(question => question.published)
            return category
        })

        difficulties = difficulties.map(difficulty => {
            difficulty.questions = difficulty.questions.filter(question => question.published)
            return difficulty
        })

        return (
            <div id="homepage-bottom-container">
                <div id="sidebar">
                    <button onClick={this.setGroupBy} style={this.state.groupBy === 'Group by Category' ? { textDecoration: 'underline' } : {}}>Group by Category</button>
                    <button onClick={this.setGroupBy} style={this.state.groupBy === 'Group by Difficulty' ? { textDecoration: 'underline' } : {}}>Group by Difficulty</button>
                </div>
                {this.state.groupBy === 'Group by Category'
                    ? <div id="box-container">
                        {categories.map((category) => {
                            return (
                                <div value={category.id} key={category.id} onMouseEnter={this.showQuestions} onMouseLeave={this.hideQuestions} className="box">
                                    <div value={category.id} className="title">{category.name}</div>
                                    {(+this.state.showQuestions === category.id) ?
                                        <div className="questions">
                                            {category.questions.map(question => <div key={question.id}><Link to={`/questions/${question.name}`} className="question-link">{question.name}</Link></div>)}</div>
                                        : <div value={category.id} className="description">{category.description}</div>}
                                </div>
                            )
                        })}
                    </div>
                    : <div id="difficulty-container">
                        {difficulties.map(difficulty => (
                            <div className="difficulty-box" key={difficulty.id}>
                                <div className="title">{difficulty.name}</div>
                                <div className="questions">{difficulty.questions.map(question => <div key={question.id}><Link to={`/questions/${question.name}`} className="question-link">{question.name}</Link></div>)}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        categories: state.categories,
        difficulties: state.difficulties
    }
}
const mapDispatch = null

export default connect(mapState, mapDispatch)(QuestionBox)

QuestionBox.propTypes = {
    categories: PropTypes.array.isRequired,
    difficulties: PropTypes.array.isRequired
}
