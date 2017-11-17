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
  difficulty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  functionName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  testSpec: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Question
