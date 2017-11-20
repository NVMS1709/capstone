const Sequelize = require('sequelize')
const db = require('../db')

const Question = db.define('question', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  javascriptSolution: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  pythonSolution: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  difficulty: {
    type: Sequelize.ENUM,
    values: ['easy', 'medium', 'hard'],
    allowNull: false
  },
  functionName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  javascriptTestFile: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  pythonTestFile: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Question
