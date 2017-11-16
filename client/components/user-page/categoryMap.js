import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategoryMap extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const categories = this.props.categories
    return (
      <div>
        {categories.map(category => (
          <p key={category.id}>Category: {category.name} - Completed: 03/12</p>
        ))}
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
