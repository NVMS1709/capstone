import React, { Component } from 'react'
import { connect } from 'react-redux'

class CategoryMap extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const categories = this.props.categories
		console.log(categories)
		return (
			<div className="categories-section">
				<div className="categories">
					{categories.map(category => {
						return (
							<div key={category.id} className="category-child">
								<div className="half-n-half">
									<h6 className="half-child">{category.name}</h6>
									<p className="half-child">{category.questions.length}</p>
								</div>
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
