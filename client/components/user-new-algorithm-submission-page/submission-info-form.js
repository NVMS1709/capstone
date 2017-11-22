import React, { Component } from 'react'
import { connect } from 'react-redux'

class SubmissionInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            algorithmName: '',
            category: '',
            difficulty: '',
            language: ''
        }
        this.setAlgorithmName = this.setAlgorithmName.bind(this);
    }

    setAlgorithmName(event) {
        this.setState({ algorithmName: event.target.value })
    }


    render() {
        const { difficulties, categories } = this.props;
        return (
            <div id="submission-info-form-container">
                <form>
                    <div className="input-row"><label>Name</label><input onChange={this.setAlgorithmName} value={this.state.algorithmName} /></div>
                    <div className="input-row">
                        <label>Category</label>
                        <select>
                            {categories && categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-row">
                        <label>Estimated Difficulty</label>
                        <select>
                            {difficulties && difficulties.map(difficulty => (
                                <option key={difficulty.id} value={difficulty.name}>{difficulty.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-row">
                        <label>Language</label>
                        <select>
                            <option value="python">python</option>
                            <option value="javascript">javascript</option>
                        </select>
                    </div>
                </form>
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.user,
        categories: state.categories,
        difficulties: state.difficulties
    }
}

export default connect(mapState)(SubmissionInfoForm)
