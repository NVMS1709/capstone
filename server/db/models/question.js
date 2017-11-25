const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  },
  javascriptSolution: {
    type: Sequelize.TEXT
  },
  pythonSolution: {
    type: Sequelize.TEXT
  },
  functionName: {
    type: Sequelize.STRING
  },
  javascriptTestFile: {
    type: Sequelize.TEXT
  },
  pythonTestFile: {
    type: Sequelize.TEXT
  },
  jsWalkThrough: {
    type: Sequelize.ARRAY(Sequelize.STRING(3000))
  },
  jsSolutionWT: {
    type: Sequelize.ARRAY(Sequelize.STRING(3000))
  }
})

module.exports = Question
