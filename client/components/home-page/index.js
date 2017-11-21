import React from 'react'
import { connect } from 'react-redux'
import RandomQuestion from './randomQuestion.js'
import QuestionBox from './questionBox.js'

const HomePage = () => {
    return (
        <div id="homepage" >
            <RandomQuestion />
            <QuestionBox />
        </div>
    )
}

export default connect()(HomePage)
