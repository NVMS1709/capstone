import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'


class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            banner: '',
            intervalId: ''
        }
    }

    componentDidMount() {

        this.setState({ banner: 'Practice Popular Questions' })

        const intervalId = setInterval(() => {
            if (this.state.banner === '' || this.state.banner === 'Land Your Dream Job') {
                this.setState({ banner: 'Practice Popular Questions' })
            } else if (this.state.banner === 'Practice Popular Questions') {
                this.setState({ banner: 'Ace the Programming Interviews' })
            } else if (this.state.banner === 'Ace the Programming Interviews') {
                this.setState({ banner: 'Land Your Dream Job' })
            }
        }, 3000)

        this.setState({ intervalId: intervalId })

    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId)
    }


    render() {
        return (
            <div id="random-question-container">
                <div id="question-column-container">
                    <div>{this.state.banner}</div>
                </div>
            </div >
        )
    }

}

const mapState = (state) => {
    return {
        questions: state.questions,
        user: state.user
    }
}

export default connect(mapState)(Welcome)
