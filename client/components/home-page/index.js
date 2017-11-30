import React from 'react'
import { connect } from 'react-redux'
import RandomQuestion from './randomQuestion.js'
import QuestionBox from './questionBox.js'
import Welcome from './welcome.js'

const HomePage = props => {

    return (
        <div id="homepage" >
            {props.user.id
                ?
                <RandomQuestion />
                :
                <Welcome />
            }
            <QuestionBox />

        </div>
    )
}

const mapState = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapState)(HomePage)
