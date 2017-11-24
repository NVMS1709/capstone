import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategoryMap extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const categories = this.props.categories
    return (
      <div className="categories-section">
        <div className="categories">
          {categories.map(category => {
            return (
              <div key={category.id} className="category-child">
                <div className="half-child">{category.name}</div>
                <div className="half-child">{category.questions.length}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapState)(CategoryMap)
