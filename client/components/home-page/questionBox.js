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
    let google, facebook, microsoft

    categories = categories.map(category => {
      category.questions = category.questions.filter(
        question => question.published
      )
      return category
    })

    difficulties = difficulties.map(difficulty => {
      difficulty.questions = difficulty.questions.filter(
        question => question.published
      )
      return difficulty
    })

    google =
      this.props &&
      this.props.questions.filter(question => {
        if (question.company) return question.company.name === 'Google'
      })

    microsoft =
      this.props &&
      this.props.questions.filter(question => {
        if (question.company) return question.company.name === 'Microsoft'
      })

    facebook =
      this.props &&
      this.props.questions.filter(question => {
        if (question.company) return question.company.name === 'Facebook'
      })

    const companies = [facebook, google, microsoft]

    return (
      <div id="homepage-bottom-container">
        <div id="sidebar">
          <button
            onClick={this.setGroupBy}
            style={
              this.state.groupBy === 'Group by Category'
                ? { textDecoration: 'underline' }
                : {}
            }
          >
            Group by Category
          </button>
          <button
            onClick={this.setGroupBy}
            style={
              this.state.groupBy === 'Group by Difficulty'
                ? { textDecoration: 'underline' }
                : {}
            }
          >
            Group by Difficulty
          </button>
          <button
            onClick={this.setGroupBy}
            style={
              this.state.groupBy === 'Group by Employer'
                ? { textDecoration: 'underline' }
                : {}
            }
          >
            Group by Company
          </button>
        </div>
        {this.state.groupBy === 'Group by Category' ? (
          <div id="box-container">
            {categories.map(category => {
              return (
                <div
                  value={category.id}
                  key={category.id}
                  onMouseEnter={this.showQuestions}
                  onMouseLeave={this.hideQuestions}
                  className="box"
                >
                  <div value={category.id} className="title">
                    {category.name}
                  </div>
                  {+this.state.showQuestions === category.id ? (
                    <div className="questions">
                      {category.questions.map(question => (
                        <div key={question.id}>
                          <Link
                            to={`/questions/${question.name}`}
                            className="question-link"
                          >
                            {question.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div value={category.id} className="description">
                      {category.description}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          ''
        )}
        {/* 'here' */}
        {/* 'here' */}
        {/* 'here' */}
        {/* 'here' */}
        {this.state.groupBy === 'Group by Company' ? (
          <div id="box-container">
            {companies.map(company => {
              return (
                <div
                  value={company[0].company.id}
                  key={company[0].company.id}
                  onMouseEnter={this.showQuestions}
                  onMouseLeave={this.hideQuestions}
                  className="box"
                >
                  <div value={company[0].id} className="title">
                    {company[0].company.name}
                  </div>
                  {+this.state.showQuestions === company[0].company.id ? (
                    <div className="questions">
                      {company.map(question => (
                        <div key={question.id}>
                          <Link
                            to={`/questions/${question.name}`}
                            className="question-link"
                          >
                            {question.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div value={company[0].company.id} className="description">
                      {company[0].company.description}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          ''
        )}
        {/* 'here' */}
        {/* 'here' */}
        {/* 'here' */}
        {/* 'here' */}
        {this.state.groupBy === 'Group by Difficulty' ? (
          <div id="difficulty-container">
            {difficulties.map(difficulty => (
              <div className="difficulty-box" key={difficulty.id}>
                <div className="title">{difficulty.name}</div>
                <div className="questions">
                  {difficulty.questions.map(question => (
                    <div key={question.id}>
                      <Link
                        to={`/questions/${question.name}`}
                        className="question-link"
                      >
                        {question.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
        {/* 'here' */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.categories,
    difficulties: state.difficulties,
    questions: state.questions
  }
}
const mapDispatch = null

export default connect(mapState, mapDispatch)(QuestionBox)

QuestionBox.propTypes = {
  categories: PropTypes.array.isRequired,
  difficulties: PropTypes.array.isRequired
}
